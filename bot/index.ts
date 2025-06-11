import { Client, GatewayIntentBits, TextChannel, EmbedBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Конфигурация
const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  adminChannelId: process.env.DISCORD_ADMIN_CHANNEL_ID,
  welcomeChannelId: process.env.DISCORD_WELCOME_CHANNEL_ID,
};

// Обработка новых анкет
async function handleNewApplication(application: any) {
  const adminChannel = await client.channels.fetch(config.adminChannelId!) as TextChannel;
  
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Новая анкета')
    .setDescription(`Пользователь ${application.nickname} подал анкету`)
    .addFields(
      { name: 'Discord ID', value: application.discordId },
      { name: 'Возраст', value: application.age.toString() },
      { name: 'Опыт', value: application.experience },
      { name: 'Мотивация', value: application.motivation }
    )
    .setTimestamp();

  await adminChannel.send({ embeds: [embed] });
}

// Обработка одобренных анкет
async function handleApprovedApplication(application: any) {
  const welcomeChannel = await client.channels.fetch(config.welcomeChannelId!) as TextChannel;
  
  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('Анкета одобрена!')
    .setDescription(`Поздравляем ${application.nickname}!`)
    .addFields(
      { name: 'Статус', value: 'Одобрено' },
      { name: 'Примечание', value: application.reviewNote || 'Без примечаний' }
    )
    .setTimestamp();

  await welcomeChannel.send({ embeds: [embed] });
}

// Обработка отклоненных анкет
async function handleRejectedApplication(application: any) {
  const welcomeChannel = await client.channels.fetch(config.welcomeChannelId!) as TextChannel;
  
  const embed = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('Анкета отклонена')
    .setDescription(`К сожалению, анкета ${application.nickname} была отклонена`)
    .addFields(
      { name: 'Статус', value: 'Отклонено' },
      { name: 'Причина', value: application.reviewNote || 'Причина не указана' }
    )
    .setTimestamp();

  await welcomeChannel.send({ embeds: [embed] });
}

// Команды бота
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!approve')) {
    const args = message.content.split(' ');
    const applicationId = args[1];
    const note = args.slice(2).join(' ');

    try {
      const application = await prisma.application.update({
        where: { id: applicationId },
        data: {
          status: 'approved',
          reviewedBy: message.author.id,
          reviewNote: note
        }
      });

      await handleApprovedApplication(application);
      await message.reply('Анкета успешно одобрена!');
    } catch (error) {
      await message.reply('Ошибка при одобрении анкеты.');
    }
  }

  if (message.content.startsWith('!reject')) {
    const args = message.content.split(' ');
    const applicationId = args[1];
    const note = args.slice(2).join(' ');

    try {
      const application = await prisma.application.update({
        where: { id: applicationId },
        data: {
          status: 'rejected',
          reviewedBy: message.author.id,
          reviewNote: note
        }
      });

      await handleRejectedApplication(application);
      await message.reply('Анкета отклонена.');
    } catch (error) {
      await message.reply('Ошибка при отклонении анкеты.');
    }
  }
});

// Запуск бота
client.once('ready', () => {
  console.log('Discord бот запущен!');
});

client.login(config.token);

export { handleNewApplication, handleApprovedApplication, handleRejectedApplication }; 