'use strict';

const  Comment  = require('../../models/comment');

async function seedComments() {
    const commentsData = [
        { post_id: 3, owner_id: 2, content: 'Świetne zdjęcie! Gdzie to było robione?' },
        { post_id: 5, owner_id: 6, content: 'Totalnie się zgadzam z tym podejściem 💯' },
        { post_id: 1, owner_id: 9, content: 'Ciekawy punkt widzenia, dałeś mi do myślenia.' },
        { post_id: 7, owner_id: 3, content: 'Haha, dokładnie! Mam podobne doświadczenia.' },
        { post_id: 8, owner_id: 12, content: 'Uwielbiam takie klimaty, mega post!' },
        { post_id: 2, owner_id: 4, content: 'Brzmi jak niezła przygoda!' },
        { post_id: 10, owner_id: 5, content: 'Czy mogę zapytać, jak to zrobiłeś? Bardzo inspirujące.' },
        { post_id: 6, owner_id: 1, content: 'Twoje wpisy są zawsze takie szczere i prawdziwe.' },
        { post_id: 11, owner_id: 13, content: 'Super ujęcie! Masz oko do fotografii 📸' },
        { post_id: 9, owner_id: 7, content: 'Dzięki za te słowa, bardzo tego potrzebowałam dziś.' },
        { post_id: 4, owner_id: 14, content: 'Świetnie napisane, widać, że z pasją.' },
        { post_id: 12, owner_id: 15, content: 'To przypomniało mi moje dzieciństwo, dzięki!' }
    ];

    const commentsToInsert = commentsData.map(entry => ({
        ...entry,
        createdAt: new Date(),
    }));

    await Comment.bulkCreate(commentsToInsert, {ignoreDuplicates: true});
}

module.exports = seedComments;
