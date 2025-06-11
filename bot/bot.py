import discord
from discord.ext import commands
import os
from dotenv import load_dotenv
import aiohttp
import json

# Загрузка переменных окружения
load_dotenv()

# Конфигурация
TOKEN = os.getenv('DISCORD_BOT_TOKEN')
ADMIN_CHANNEL_ID = int(os.getenv('DISCORD_ADMIN_CHANNEL_ID'))
WELCOME_CHANNEL_ID = int(os.getenv('DISCORD_WELCOME_CHANNEL_ID'))
API_URL = os.getenv('API_URL', 'http://localhost:3000')  # URL вашего API

# Настройка бота
intents = discord.Intents.default()
intents.message_content = True
intents.members = True

bot = commands.Bot(command_prefix='!', intents=intents)

# Обработка новых анкет
async def handle_new_application(application):
    channel = bot.get_channel(ADMIN_CHANNEL_ID)
    if channel:
        embed = discord.Embed(
            title="Новая анкета",
            description=f"Пользователь {application['nickname']} подал анкету",
            color=discord.Color.blue()
        )
        embed.add_field(name="Discord ID", value=application['discordId'])
        embed.add_field(name="Возраст", value=str(application['age']))
        embed.add_field(name="Опыт", value=application['experience'])
        embed.add_field(name="Мотивация", value=application['motivation'])
        await channel.send(embed=embed)

# Обработка одобренных анкет
async def handle_approved_application(application):
    channel = bot.get_channel(WELCOME_CHANNEL_ID)
    if channel:
        embed = discord.Embed(
            title="Анкета одобрена!",
            description=f"Поздравляем {application['nickname']}!",
            color=discord.Color.green()
        )
        embed.add_field(name="Статус", value="Одобрено")
        embed.add_field(name="Примечание", value=application.get('reviewNote', 'Без примечаний'))
        await channel.send(embed=embed)

# Обработка отклоненных анкет
async def handle_rejected_application(application):
    channel = bot.get_channel(WELCOME_CHANNEL_ID)
    if channel:
        embed = discord.Embed(
            title="Анкета отклонена",
            description=f"К сожалению, анкета {application['nickname']} была отклонена",
            color=discord.Color.red()
        )
        embed.add_field(name="Статус", value="Отклонено")
        embed.add_field(name="Причина", value=application.get('reviewNote', 'Причина не указана'))
        await channel.send(embed=embed)

@bot.event
async def on_ready():
    print(f'Бот {bot.user} запущен!')

@bot.command(name='approve')
async def approve_application(ctx, application_id: str, *, note: str = None):
    if not ctx.author.guild_permissions.administrator:
        await ctx.send("У вас нет прав для выполнения этой команды.")
        return

    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                f"{API_URL}/api/applications/{application_id}/approve",
                json={"note": note}
            ) as response:
                if response.status == 200:
                    application = await response.json()
                    await handle_approved_application(application)
                    await ctx.send("Анкета успешно одобрена!")
                else:
                    await ctx.send("Ошибка при одобрении анкеты.")
        except Exception as e:
            await ctx.send(f"Произошла ошибка: {str(e)}")

@bot.command(name='reject')
async def reject_application(ctx, application_id: str, *, reason: str = None):
    if not ctx.author.guild_permissions.administrator:
        await ctx.send("У вас нет прав для выполнения этой команды.")
        return

    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                f"{API_URL}/api/applications/{application_id}/reject",
                json={"reason": reason}
            ) as response:
                if response.status == 200:
                    application = await response.json()
                    await handle_rejected_application(application)
                    await ctx.send("Анкета отклонена.")
                else:
                    await ctx.send("Ошибка при отклонении анкеты.")
        except Exception as e:
            await ctx.send(f"Произошла ошибка: {str(e)}")

@bot.command(name='list')
async def list_applications(ctx):
    if not ctx.author.guild_permissions.administrator:
        await ctx.send("У вас нет прав для выполнения этой команды.")
        return

    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(f"{API_URL}/api/applications") as response:
                if response.status == 200:
                    applications = await response.json()
                    if not applications:
                        await ctx.send("Нет активных анкет.")
                        return

                    embed = discord.Embed(
                        title="Список анкет",
                        color=discord.Color.blue()
                    )
                    
                    for app in applications:
                        status_emoji = {
                            'pending': '⏳',
                            'approved': '✅',
                            'rejected': '❌'
                        }.get(app['status'], '❓')
                        
                        embed.add_field(
                            name=f"{status_emoji} {app['nickname']}",
                            value=f"ID: {app['id']}\nСтатус: {app['status']}\nВозраст: {app['age']}",
                            inline=False
                        )
                    
                    await ctx.send(embed=embed)
                else:
                    await ctx.send("Ошибка при получении списка анкет.")
        except Exception as e:
            await ctx.send(f"Произошла ошибка: {str(e)}")

# Запуск бота
if __name__ == "__main__":
    bot.run(TOKEN) 