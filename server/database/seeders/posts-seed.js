'use strict';

const  Post  = require('../../models/post');
const path = require('path');

async function seedPosts() {
    const postsData = [
        { owner_id: 1, content: 'Dziś pierwszy dzień na oddziale intensywnej terapii. Czułam się jak w serialu.', photo_path: null },
        { owner_id: 1, content: 'Zaczęłam planować wolontariat medyczny w Kenii na przyszłe lato. Ktoś był?', photo_path: null },
        { owner_id: 2, content: 'Pikantna zupa dyniowa po służbie to najlepsze lekarstwo na zmęczenie.', photo_path: 'images/dynia_zupa.jpg' },
        { owner_id: 2, content: 'Dziś uratowaliśmy kota z drzewa. Tak, stereotypy bywają prawdziwe!', photo_path: null },
        { owner_id: 3, content: 'Nowy układ do tańca gotowy! Czuję to w kościach, będzie ogień 🔥', photo_path: 'images/flamenco.jpg' },
        { owner_id: 4, content: 'Przeglądając rękopisy z XIII wieku. Czytam lepiej po łacinie niż po niemiecku 🤓', photo_path: null },
        { owner_id: 5, content: 'Makieta nowego osiedla gotowa! Dużo zieleni, zero aut w centrum.', photo_path: 'images/makieta.jpg' },
        { owner_id: 5, content: 'Zaczęłam projektować domek na drzewie dla dzieciaków z sąsiedztwa!', photo_path: null },
        { owner_id: 6, content: 'Wczoraj widzieliśmy pierścienie Saturna przez teleskop. Niezapomniane wrażenie.', photo_path: 'images/saturn.jpg' },
        { owner_id: 6, content: 'Uważam, że każdy powinien choć raz w życiu spojrzeć w niebo z dala od miasta.', photo_path: null },
        { owner_id: 7, content: 'W gabinecie pracuję z dziećmi, ale to one uczą mnie najwięcej.', photo_path: null },
        { owner_id: 8, content: 'Nowa porcja hummusu z dodatkiem fig – totalny sztos! 🧄🧆', photo_path: 'images/hummus_fig.jpg' },
        { owner_id: 9, content: 'Dzisiaj sprzedałam książkę o japońskim ogrodnictwie. Chyba muszę ją teraz przeczytać 😅', photo_path: null },
        { owner_id: 10, content: 'Wyszedłem z klientem na skałki. Zakochał się w wysokości po pierwszej wspinaczce!', photo_path: 'images/skalki.jpg' },
        { owner_id: 11, content: 'Udało mi się zaobserwować rzadkiego dudka w dolinie! 🐦', photo_path: 'images/dudek.jpg' },
        { owner_id: 12, content: 'Tajlandia o zachodzie słońca z drona – magia. 📸', photo_path: 'images/thailand_drone.jpg' },
        { owner_id: 13, content: 'Piszę materiał o nielegalnych wysypiskach. Ktoś chce się podzielić historią?', photo_path: null },
        { owner_id: 14, content: 'Pierwszy trening z nową drużyną! Jest potencjał, jest energia!', photo_path: null },
        { owner_id: 15, content: 'Udało mi się wyhodować miniaturowy klon japoński. Mam nadzieję, że przetrwa zimę.', photo_path: 'images/bonsai.jpg' }
    ];

    const postsToInsert = postsData.map(post => ({
        ...post,
        photo_path: post.photo_path ? path.resolve(__dirname, '..', '..', post.photo_path) : null,
        createdAt: new Date(),
    }));

    await Post.bulkCreate(postsToInsert, { ignoreDuplicates: true });
}

module.exports = seedPosts;
