'use strict';

const  User  = require('../../models/user');
const passwordManager = require('../../auth/passwordManager');

async function seedUsers() {
  const usersData = [
    {
      name: 'Alice Nowak',
      username: 'alice_n',
      email: 'alice.n@example.com',
      password: 'password123',
      description: 'Młoda lekarka zakochana w medycynie i podróżach.'
    },
    {
      name: 'Bartek Kowalski',
      username: 'bartekk',
      email: 'bartek.k@example.com',
      password: 'password123',
      description: 'Strażak z pasją do gotowania.'
    },
    {
      name: 'Carmen Ruiz',
      username: 'carmenr',
      email: 'carmen.r@example.com',
      password: 'password123',
      description: 'Tancerka flamenco i nauczycielka rytmiki.'
    },
    {
      name: 'Daniel Schmidt',
      username: 'dschmidt',
      email: 'daniel.s@example.com',
      password: 'password123',
      description: 'Historyk, który uwielbia średniowiecze.'
    },
    {
      name: 'Elena Petrova',
      username: 'elenap',
      email: 'elena.p@example.com',
      password: 'password123',
      description: 'Architektka tworząca zielone miasta.'
    },
    {
      name: 'Farid Al-Mansur',
      username: 'faridm',
      email: 'farid.m@example.com',
      password: 'password123',
      description: 'Miłośnik astronomii, prowadzi obserwatorium.'
    },
    {
      name: 'Gabriela Wójcik',
      username: 'gabiw',
      email: 'gabriela.w@example.com',
      password: 'password123',
      description: 'Psycholożka dziecięca z wielkim sercem.'
    },
    {
      name: 'Hassan Yilmaz',
      username: 'hassany',
      email: 'hassan.y@example.com',
      password: 'password123',
      description: 'Szef kuchni, specjalizuje się w kuchni bliskowschodniej.'
    },
    {
      name: 'Isabella Conti',
      username: 'isabellac',
      email: 'isabella.c@example.com',
      password: 'password123',
      description: 'Właścicielka małej księgarni w Rzymie.'
    },
    {
      name: 'Jakub Nowicki',
      username: 'jakubn',
      email: 'jakub.n@example.com',
      password: 'password123',
      description: 'Instruktor wspinaczki górskiej i survivalu.'
    },
    {
      name: 'Karolina Zielińska',
      username: 'karolinaz',
      email: 'karolina.z@example.com',
      password: 'password123',
      description: 'Studentka biologii, obserwuje ptaki.'
    },
    {
      name: 'Leon Tanaka',
      username: 'leont',
      email: 'leon.t@example.com',
      password: 'password123',
      description: 'Fotograf przyrody, podróżuje po Azji.'
    },
    {
      name: 'Maria Gomez',
      username: 'mariag',
      email: 'maria.g@example.com',
      password: 'password123',
      description: 'Dziennikarka śledcza, kocha pisać prawdę.'
    },
    {
      name: 'Noah Williams',
      username: 'noahw',
      email: 'noah.w@example.com',
      password: 'password123',
      description: 'Trener piłki nożnej dla dzieci.'
    },
    {
      name: 'Olga Król',
      username: 'olgak',
      email: 'olga.k@example.com',
      password: 'password123',
      description: 'Florystka z zamiłowaniem do bonsai i ikebany.'
    }
  ];

  const usersToInsert = await Promise.all(
      usersData.map(async user => ({
        name: user.name,
        username: user.username,
        email: user.email,
        password_hash: await passwordManager.hash(user.password),
        description: user.description,
        createdAt: new Date()
      }))
  );

  await User.bulkCreate(usersToInsert, { ignoreDuplicates: true }); // nie dubluje danych przy wielokrotnym uruchomieniu
}

module.exports = seedUsers;
