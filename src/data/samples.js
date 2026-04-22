// three pre-built notebooks that carry the whole demo.
// each person has real dated notes and pre-computed margin notes and gift suggestions.

// helper — turn a yyyy-mm-dd + optional hour into an iso string
function d(ymd, hour = 9) {
  return new Date(`${ymd}T${String(hour).padStart(2, '0')}:00:00Z`).toISOString();
}

// ————————————————————————————————————————————————
// MAA — 58, indian mother, lives alone in aurangabad
// user is a 27-yr-old in newcastle, visits may 2026
// ————————————————————————————————————————————————

const maaPerson = {
  id: 'sample_maa',
  name: 'maa',
  created_at: d('2026-01-14', 8),
  updated_at: d('2026-04-19', 20),
  is_sample: true,
  sample_blurb: 'indian mother in aurangabad. widowed two years.',
};

const maaNotes = [
  {
    id: 'snote_maa_11',
    created_at: d('2026-04-19', 20),
    body: "sunday call. forty minutes. she said her knee is better when she sits in the sun on the balcony in the morning. told me to do yoga. then asked if i'm eating proper rotis or just bread.",
    occasion: 'phone call',
    margin_note: 'the knee question is not really about yoga. she is telling you she sits on the balcony alone every morning.',
  },
  {
    id: 'snote_maa_10',
    created_at: d('2026-04-12', 19),
    body: "she talked about diwali 2023 for four minutes. laughed about how the neighbour's dog got scared of the diyas and hid under the bed. said she misses when the whole building did diyas together. the new family on the second floor doesn't.",
    occasion: 'phone call',
    margin_note: 'unusually long memory recall. she is feeling nostalgic this month.',
  },
  {
    id: 'snote_maa_9',
    created_at: d('2026-04-05', 19),
    body: "she mentioned her knee hurting going up the stairs. said she doesn't want to see the doctor. said doctors just prescribe things and charge money. i didn't push.",
    occasion: 'phone call',
    margin_note: 'she said this twice this month. both times brushed it off. the knee thing is real.',
  },
  {
    id: 'snote_maa_8',
    created_at: d('2026-03-29', 19),
    body: "she has been watching old shaktimaan episodes on youtube. every evening. she said the new tv shows don't make sense to her. she laughed when she told me shaktimaan's hair looked so silly now.",
    occasion: 'phone call',
    margin_note: null,
  },
  {
    id: 'snote_maa_7',
    created_at: d('2026-03-22', 20),
    body: "she said dadi's old brass diya is getting dull. she has been cleaning it with lemon but it's not coming back. she said she doesn't want a new one, she wants to keep dadi's alive.",
    occasion: 'phone call',
    margin_note: 'the object carries dadi. replacing is not the answer. keeping it alive is the answer.',
  },
  {
    id: 'snote_maa_6',
    created_at: d('2026-03-15', 20),
    body: "she taught rekha aunty how to make her ajwain paratha over the phone. said rekha can never get it right because she doesn't let the atta rest long enough. said i should learn it properly before i forget what home tastes like.",
    occasion: 'phone call',
    margin_note: 'the only time this month she asked something of you. she wants you to have the recipe.',
  },
  {
    id: 'snote_maa_5',
    created_at: d('2026-03-08', 19),
    body: "mentioned her knee again. said going down to the sabziwala takes longer now. said she takes the rickshaw now for anything over two streets. she said it casually. moved on to whether i'm drinking enough water.",
    occasion: 'phone call',
    margin_note: null,
  },
  {
    id: 'snote_maa_4',
    created_at: d('2026-02-22', 19),
    body: "she has been watering the tulsi on the balcony twice a day. she said papa used to do it once a day so she's being extra. she sounded happy saying it.",
    occasion: 'phone call',
    margin_note: 'she is keeping his small daily things going. tulsi is a daily ritual of his now carried by her.',
  },
  {
    id: 'snote_maa_3',
    created_at: d('2026-02-08', 20),
    body: "rekha aunty came over for tea and they watched a hindi tv serial together. she said rekha cried at the ending and maa teased her for three days about it. she was laughing when she told me.",
    occasion: 'phone call',
    margin_note: null,
  },
  {
    id: 'snote_maa_2',
    created_at: d('2026-01-25', 19),
    body: "she asked if i'm coming home before the monsoon. i said may. she said good, the mangoes will still be there in may. the langda ones this year are supposedly very good.",
    occasion: 'phone call',
    margin_note: "she is counting the weeks. she would never say it but she is.",
  },
  {
    id: 'snote_maa_1',
    created_at: d('2026-01-14', 19),
    body: "first note. she asked me three times if i've been wearing warm socks in newcastle. i don't wear socks indoors. i told her i do.",
    occasion: null,
    margin_note: null,
  },
];

const maaSuggestions = {
  default: {
    three_ideas: [
      {
        title: 'a brass diya polishing kit.',
        reasoning:
          "she said dadi's diya is getting dull and lemon is not bringing it back. she does not want a replacement, she wants dadi's kept alive. a polishing kit and a small pot of metal wax honours the object. take it with you in may. spend an afternoon cleaning it together. this is the best answer this year.",
        cost: 'under £20',
      },
      {
        title: 'the ajwain paratha saturday.',
        reasoning:
          "this is not something you buy. you are going home in may. ask her to teach you to make her ajwain paratha properly, the way rekha aunty can't. she told you to learn it before you forget what home tastes like. that saturday morning in the kitchen is the gift she is actually asking for.",
        cost: 'free',
      },
      {
        title: 'a soft knee support and proper indoor slippers with arch support.',
        reasoning:
          "the knee came up in early march, again late march, and again april 19. she is playing it down. she won't see the doctor. she takes the rickshaw for two streets now. not romantic, but noticing is the gift. a decent knee brace and slippers that don't destroy her feet go further than any saree.",
        cost: '£20-£50',
      },
    ],
    do_not_get_them:
      'do not get her another saree, another sweet box, a generic hamper, or anything with "mom" printed in english.',
    one_sentence_verdict:
      'the diya kit is the headline answer. the saturday morning paratha is the quiet one she wants most.',
  },
  when_i_visit: {
    three_ideas: [
      {
        title: 'the ajwain paratha saturday.',
        reasoning:
          'you are going home in may. block a saturday morning. ask her to teach you the paratha properly. she told rekha aunty the trick is letting the atta rest long enough. she told you, without telling you, that she wants you to have the recipe. this is the gift.',
        cost: 'free',
      },
      {
        title: "clean dadi's brass diya together.",
        reasoning:
          "take polish and a soft cloth with you. don't make a ceremony of it. just sit on the balcony one morning and clean it. she won't say it but doing the small care task together is what she's been asking for for years.",
        cost: 'free',
      },
      {
        title: 'a proper knee brace and a pair of slippers with arch support.',
        reasoning:
          'bring them in your suitcase. do not announce them as a gift. put them on the shelf in the kitchen. she will use them within a week because she is not a performer.',
        cost: '£20-£50',
      },
    ],
    do_not_get_them:
      'do not arrive with gadgets, perfumes, or anything branded from heathrow. she does not want things from duty free. she wants time.',
    one_sentence_verdict:
      'you are the gift this month. the paratha saturday is how she wants you to spend it.',
  },
  birthday: {
    three_ideas: [
      {
        title: 'a printed photo album of papa and the tulsi.',
        reasoning:
          'she is watering papa\'s tulsi twice a day instead of once. she is keeping his small daily rituals alive. a small album — ten old photos of the two of them on the balcony, printed, with dates written on the back — honours what she is already doing quietly.',
        cost: '£20-£50',
      },
      {
        title: "dadi's diya polishing kit.",
        reasoning:
          "the brass diya is getting dull and she refuses to replace it. a proper polishing kit lets her keep dadi's light alive, which is exactly what she's been trying to do with lemon and a cloth.",
        cost: 'under £20',
      },
      {
        title: 'a four-minute voice note, not a call.',
        reasoning:
          "on the morning, send a voice note recounting the diwali 2023 story about the neighbour's dog — in your own voice, the way she told it to you. tell her you remembered it. she will listen to it more than once.",
        cost: 'free',
      },
    ],
    do_not_get_them:
      'do not courier her flowers, a cake, or anything ordered from a website. she will eat it alone and it will feel wrong.',
    one_sentence_verdict:
      'the album of papa and the tulsi is the one that will sit by her bed. but the voice note is what she will tell rekha aunty about.',
  },
  just_because: {
    three_ideas: [
      {
        title: 'the four-minute voice note.',
        reasoning:
          'record the diwali 2023 story the way she told it to you — neighbour\'s dog hiding under the bed and all. send it on a wednesday, not sunday. she is nostalgic this month. the gift is hearing her own memory come back to her in your voice.',
        cost: 'free',
      },
      {
        title: 'a crate of alphonso mangoes couriered to her door.',
        reasoning:
          "she mentioned mangoes in january — the langda this year are supposedly very good. a small crate from a proper mandi-sourced service, arriving with no note, is a small surprise. she will call rekha aunty to tell her.",
        cost: '£20-£50',
      },
      {
        title: 'a pair of proper slippers with arch support.',
        reasoning:
          "the knee thing is real even though she won't say it. slippers that don't ruin her feet cost £30 and will matter every single morning. not romantic. specific.",
        cost: '£20-£50',
      },
    ],
    do_not_get_them:
      'do not send another kurta, sweet box, or amazon india voucher. she has eight kurtas and does not need the decision fatigue of picking.',
    one_sentence_verdict:
      "the voice note costs nothing. it's the one she plays twice.",
  },
  mothers_day: {
    three_ideas: [
      {
        title: 'the diwali 2023 story, recorded back to her.',
        reasoning:
          "record the neighbour's-dog diwali story in your own voice, the way she told it to you. send it the day before. tell her you remembered. this is not sentimental — it's showing her you were listening.",
        cost: 'free',
      },
      {
        title: "the ajwain paratha saturday (scheduled for may).",
        reasoning:
          "for mother's day itself, send a short message saying you've booked the saturday after you land for her to teach you the paratha. the gift is the commitment on the calendar, not the act yet.",
        cost: 'free',
      },
      {
        title: 'a small printed photo of papa at the tulsi.',
        reasoning:
          'she waters it twice a day. she never said she misses him in words. a single framed 4x6 of papa on the balcony, dropped into the post, lets her put him where she can see him in the morning.',
        cost: 'under £20',
      },
    ],
    do_not_get_them:
      'do not send a mother\'s day card that says "to the best mum" in english cursive. she will open it and say thank you and then never look at it again.',
    one_sentence_verdict:
      'the paratha saturday booked in advance is the answer. the rest are just things to hold her over until you arrive.',
  },
};

// ————————————————————————————————————————————————
// RIYA — younger sister in pune, just turned 24
// freelance graphic designer, new at it, anxious
// ————————————————————————————————————————————————

const riyaPerson = {
  id: 'sample_riya',
  name: 'riya',
  created_at: d('2025-12-28', 10),
  updated_at: d('2026-04-21', 22),
  is_sample: true,
  sample_blurb: 'younger sister in pune. freelance designer, just started.',
};

const riyaNotes = [
  {
    id: 'snote_riya_18',
    created_at: d('2026-04-21', 22),
    body: "voice note from her at 11pm. killed her third sourdough starter. said her kitchen smells like a yeast funeral. laughed about it but the laugh was tight. said she's going to stop trying.",
    occasion: 'voice note',
    margin_note: 'the laugh was tight. not about the bread. she is measuring herself against too many things right now.',
  },
  {
    id: 'snote_riya_17',
    created_at: d('2026-04-17', 19),
    body: "signed up for a pottery class in kothrud. went once. said the teacher was intimidating. said she might not go back. then said she might. then sent a photo of a lopsided bowl.",
    occasion: null,
    margin_note: 'she sent the photo. she is going back.',
  },
  {
    id: 'snote_riya_16',
    created_at: d('2026-04-12', 21),
    body: "she has been looking at a ceramic studio in bandra on instagram for four weeks. 'ilachi clay.' saves every reel. never buys. said the mugs are forty pounds each which is insane. insane was said three times.",
    occasion: null,
    margin_note: "saying a price is insane three times means she wants it.",
  },
  {
    id: 'snote_riya_15',
    created_at: d('2026-04-08', 23),
    body: "she sent her first proper freelance invoice. client paid. she said it felt like being handed counterfeit money. like someone would ring the bell and ask for it back.",
    occasion: 'career milestone',
    margin_note: 'she did not expect to be paid like a professional this soon. she is processing it.',
  },
  {
    id: 'snote_riya_14',
    created_at: d('2026-04-02', 18),
    body: "running a 5k in may. started training on the sinhagad road. hates it. said the running shoes she has are her college ones from four years ago and her ankles are angry.",
    occasion: null,
    margin_note: 'the shoes are the whole problem. she has not connected the dots.',
  },
  {
    id: 'snote_riya_13',
    created_at: d('2026-03-28', 20),
    body: 'she re-watched the entire parks and rec again. fourth time. said leslie knope is who she wants to be when her brain isn\'t flat.',
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_riya_12',
    created_at: d('2026-03-22', 16),
    body: "bruno her cat climbed onto her macbook during a client call. she filmed it. bruno is sixteen and a grump. she loves him more than she loves most people.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_riya_11',
    created_at: d('2026-03-17', 22),
    body: "she is reading 'norwegian wood'. second time this year. said she reads it slowly in march because the cold evenings in pune (not actually cold) feel like the mood.",
    occasion: null,
    margin_note: 'she rereads the same book in the same season. this is not a recommendation, it is a ritual.',
  },
  {
    id: 'snote_riya_10',
    created_at: d('2026-03-11', 19),
    body: "she wants a japanese gyuto knife. specifically tojiro dp 210mm. has the link saved. will not buy it. said it's too much money for a knife. it's forty-five pounds.",
    occasion: null,
    margin_note: "she has the exact model saved. a very knowable gift, rare for adults.",
  },
  {
    id: 'snote_riya_9',
    created_at: d('2026-03-05', 21),
    body: "landlord tried to raise rent by thirty percent. she told him no in her calmest voice and then called me crying. said she doesn't like being good at being cold with people.",
    occasion: null,
    margin_note: 'she thinks hardness is a failure. she won. but she is counting the cost.',
  },
  {
    id: 'snote_riya_8',
    created_at: d('2026-02-28', 23),
    body: "she ended things with aditya. said the relationship felt like a jacket she'd outgrown. she is okay. she is not okay. both are true.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_riya_7',
    created_at: d('2026-02-20', 20),
    body: "she spent thirty minutes telling me about muji gel pens. specifically the 0.38mm ones. said the 0.5 is barbaric. she owns eleven. wants a twelfth.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_riya_6',
    created_at: d('2026-02-14', 15),
    body: 'she is planning a trip to japan in her head. has a google doc. has sections. has a sub-section for ramen and a sub-section for stationery shops in kyoto. has not booked anything.',
    occasion: null,
    margin_note: 'the doc is the trip. she does not need it to happen yet to enjoy it.',
  },
  {
    id: 'snote_riya_5',
    created_at: d('2026-02-07', 22),
    body: "she misses nani. specifically, the way nani taught her rangoli at four — sitting on the floor while mum did work in the other room. said she has never been able to draw a proper rangoli since.",
    occasion: null,
    margin_note: "grief is specific. it is a memory of a posture, not just a person.",
  },
  {
    id: 'snote_riya_4',
    created_at: d('2026-01-25', 18),
    body: 'she has been listening to fiona apple "tidal" on loop. said she keeps skipping to sullen girl. said she is fine. i think she is fine.',
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_riya_3',
    created_at: d('2026-01-18', 21),
    body: 'she bought a calathea plant. called it "meera". said she is going to take good care of this one. killed it by the end of the month. was annoyed, not sad.',
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_riya_2',
    created_at: d('2026-01-10', 19),
    body: "anxious about turning 25 this year. said 24 felt like a beta and 25 is the 'real version' and she does not feel ready for the real version.",
    occasion: null,
    margin_note: "she has already decided 25 is a test. you can help her rewrite the premise.",
  },
  {
    id: 'snote_riya_1',
    created_at: d('2025-12-28', 10),
    body: "first note. she moved into the flat in koregaon park. said the kitchen light is yellow and the bathroom light is too white and she will fix it first thing. she has not fixed it.",
    occasion: null,
    margin_note: null,
  },
];

const riyaSuggestions = {
  default: {
    three_ideas: [
      {
        title: 'the tojiro dp 210mm gyuto, posted quietly.',
        reasoning:
          'she has the exact model saved. she has said it is too expensive three times. it is forty-five pounds. rare that an adult tells you exactly what they want and then refuses to buy it. a knife like this outlives the flat, the freelancing, the breakup. use it every day for ten years.',
        cost: '£20-£50',
      },
      {
        title: 'a pair of proper running shoes in her size.',
        reasoning:
          "her ankles are hurting because her trainers are four years old. she has not connected the dots. order asics nimbus or saucony endorphin in size and ship to pune. she is running a 5k in may and does not know her shoes are the whole problem.",
        cost: '£50-£100',
      },
      {
        title: "a saturday afternoon rangoli call.",
        reasoning:
          "she misses nani. specifically, the four-year-old memory of sitting on the floor being taught rangoli. book a two hour call on a saturday, buy the chalks together, and sit on her kitchen floor with her on video and learn rangoli side by side. the gift is that you remembered a specific sentence she said in february.",
        cost: 'free',
      },
    ],
    do_not_get_them:
      'do not get her plants, stationery boxes from amazon, a generic "self care" kit, or anything branded "girl boss" or "hustle."',
    one_sentence_verdict:
      "the gyuto is the answer. but the rangoli saturday is the one that lands because it proves you listen.",
  },
  birthday: {
    three_ideas: [
      {
        title: 'the tojiro dp 210mm gyuto.',
        reasoning:
          'she has the link saved, said three times the price is insane, will not buy it for herself. her 25th birthday is the exact excuse. buy it, wrap it in a kitchen towel, post it. the knife becomes the kitchen she wants to be good in.',
        cost: '£20-£50',
      },
      {
        title: 'a rewrite-your-25 letter.',
        reasoning:
          "she decided 25 is a test. write her a short letter (not a card) saying why you think 24 was the full version already and what you've seen in her this year. reference three specific things from the last four months. she will read it on the morning.",
        cost: 'free',
      },
      {
        title: 'a muji gel pen drop — one of each 0.38mm colour.',
        reasoning:
          'she has eleven. she wants a twelfth. also the thirteenth, fourteenth, fifteenth. a small box of 0.38mm gel pens in colours she does not yet have is a cheap win that she uses every day for a year.',
        cost: 'under £20',
      },
    ],
    do_not_get_them:
      'do not get her a plant. she has killed three and is annoyed about it. do not get her a skincare hamper. do not get her an experience day.',
    one_sentence_verdict:
      'the knife is the object. the letter is what she keeps in the drawer.',
  },
  just_because: {
    three_ideas: [
      {
        title: 'a proper pair of running shoes in her size.',
        reasoning:
          'her ankles hurt because her trainers are four years old. she is running 5k in may and does not know the shoes are the problem. shipping a pair without announcing them is a quiet act of noticing.',
        cost: '£50-£100',
      },
      {
        title: 'one "ilachi clay" mug, ordered direct.',
        reasoning:
          "she has been watching that bandra ceramic studio on instagram for four weeks. says forty pounds is insane. one mug. send it with no card. she will use it every morning and think someone is paying attention.",
        cost: '£20-£50',
      },
      {
        title: "a 20-minute rangoli call on saturday.",
        reasoning:
          "reference the february note about nani. say you want to try learning rangoli, together, badly. she will run with it. the gift is the remembering.",
        cost: 'free',
      },
    ],
    do_not_get_them:
      'do not send a bouquet. do not buy her a plant. do not send a book she already owns.',
    one_sentence_verdict:
      'the running shoes are the sleeper hit. the ilachi mug is the one she photographs.',
  },
  career_milestone: {
    three_ideas: [
      {
        title: 'a framed print of her first freelance invoice.',
        reasoning:
          "she said the first paid invoice felt like counterfeit money. print the invoice, frame it plainly, post it. it makes the thing real without being sentimental. she said she was scared someone would ring the bell and ask for it back. a frame is the opposite of a bell.",
        cost: 'under £20',
      },
      {
        title: 'a proper good desk lamp.',
        reasoning:
          "she works nights. she complained in december about the kitchen being yellow and the bathroom being white. designers know when light is wrong. an anglepoise-style lamp with a warm bulb is what the next three years of work deserve.",
        cost: '£50-£100',
      },
      {
        title: "a short letter starting with 'you didn't fake it.'",
        reasoning:
          "name what she is feeling. list three specific client-facing things she did this year that were professional, by any standard. she needs the outside voice more than she needs an object.",
        cost: 'free',
      },
    ],
    do_not_get_them:
      'do not send champagne, a "boss babe" mug, or anything with the word hustle on it.',
    one_sentence_verdict:
      'frame the invoice. it will sit on her desk for the next decade.',
  },
  just_because_alt: null,
};

// ————————————————————————————————————————————————
// JAMES — flatmate in newcastle, marine bio phd
// quiet, guitar at 11pm, dad recently ill
// ————————————————————————————————————————————————

const jamesPerson = {
  id: 'sample_james',
  name: 'james',
  created_at: d('2026-01-06', 21),
  updated_at: d('2026-04-20', 23),
  is_sample: true,
  sample_blurb: 'flatmate in newcastle. marine bio phd. quiet.',
};

const jamesNotes = [
  {
    id: 'snote_james_14',
    created_at: d('2026-04-20', 23),
    body: "played the same tom waits song for an hour upstairs. 'hold on.' didn't come down for dinner. knocked — said he was fine. wasn't fine.",
    occasion: null,
    margin_note: 'hold on is not a song you loop for fun. he is grieving something he has not said out loud.',
  },
  {
    id: 'snote_james_13',
    created_at: d('2026-04-15', 22),
    body: "his dad's tremor diagnosis came back as early parkinson's. he told me while washing up. kept washing up. said 'it is what it is' twice.",
    occasion: 'family news',
    margin_note: 'the phrase "it is what it is" is what he says when he is not ready to feel it.',
  },
  {
    id: 'snote_james_12',
    created_at: d('2026-04-10', 19),
    body: "presentation at durham went badly. supervisor interrupted him twice in front of the panel. he came home, made tea, didn't say a word for two hours, then played chess online until 2am.",
    occasion: null,
    margin_note: 'chess is his retreat. the silence after the tea is the real event.',
  },
  {
    id: 'snote_james_11',
    created_at: d('2026-04-03', 20),
    body: "we walked past 'the bridge tavern' on friday. he stopped. said the stout there is the only stout in newcastle that tastes like the one his grandad used to drink in sunderland. went in for one. stayed for three.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_james_10',
    created_at: d('2026-03-28', 18),
    body: "bought a 1994 epson flatbed scanner on ebay. £12. he says the new ones oversharpen. he is scanning every field notebook from his phd so far. he is very precise about this project.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_james_9',
    created_at: d('2026-03-20', 22),
    body: "reading 'blood meridian' again. third time in two years. said he reads it to remember that real prose exists.",
    occasion: null,
    margin_note: 'a reread is his anchor. when things are unstable he goes back to the same shelf.',
  },
  {
    id: 'snote_james_8',
    created_at: d('2026-03-12', 20),
    body: "talked for twenty minutes about 'kim's ramen' on stowell street. specifically the tonkotsu on a thursday. he goes alone. he goes every two weeks. he did not invite me.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_james_7',
    created_at: d('2026-03-03', 22),
    body: "played 'rain dogs' quietly in the kitchen at 11pm. sang under his breath. i pretended not to hear.",
    occasion: null,
    margin_note: "he sings when he thinks no one is listening. do not make it a thing.",
  },
  {
    id: 'snote_james_6',
    created_at: d('2026-02-24', 19),
    body: "said he misses his mum's scones. specifically the ones with sultanas, not the cheese ones. said no scone in newcastle is correct. he is firm about this.",
    occasion: null,
    margin_note: "firm opinion on a small food item usually means he is homesick.",
  },
  {
    id: 'snote_james_5',
    created_at: d('2026-02-15', 17),
    body: 'tried to teach me the opening of a chess game. the caro-kann. got animated about it. drew the board on a napkin. apologised for being nerdy. i said he should not apologise.',
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_james_4',
    created_at: d('2026-02-04', 20),
    body: "said he wants to learn to swim properly. he can do front crawl but he says he is 'a mess in the water'. being a marine biologist who cannot swim well bothers him. said it jokingly, then didn't.",
    occasion: null,
    margin_note: 'the joke is not a joke. he thinks it is a private hypocrisy.',
  },
  {
    id: 'snote_james_3',
    created_at: d('2026-01-22', 21),
    body: "has been vegetarian eight years. complained that the place on quayside still put bacon bits in his veggie burger. he was not angry. he was tired of explaining.",
    occasion: null,
    margin_note: null,
  },
  {
    id: 'snote_james_2',
    created_at: d('2026-01-14', 22),
    body: "his guitar is an old silvertone from oxfam. he restrings it himself. says the tuners are a crime. says he will replace them. has not.",
    occasion: null,
    margin_note: "small repair he has been putting off for months. a knowable gift.",
  },
  {
    id: 'snote_james_1',
    created_at: d('2026-01-06', 21),
    body: 'moved in. six boxes, one guitar, a scanner that did not work. said he was sorry in advance for the 11pm playing. i said it was fine. it is fine.',
    occasion: null,
    margin_note: null,
  },
];

const jamesSuggestions = {
  default: {
    three_ideas: [
      {
        title: 'a set of decent tuning machines for his silvertone.',
        reasoning:
          "he has complained about the tuners since january. he keeps meaning to replace them. he won't. a set of grover mini rotomatics costs under £30 and is a very specific, very known gift. the kind that says 'i was paying attention the night you complained.'",
        cost: '£20-£50',
      },
      {
        title: "a thursday at kim's ramen, on you.",
        reasoning:
          "he goes to kim's every two weeks. alone. tonkotsu on a thursday. he did not invite you. say you are hungry on thursday and you heard kim's does a decent bowl. he will light up. keep the dinner under an hour. do not make it a big thing.",
        cost: 'under £20',
      },
      {
        title: 'five proper scones, posted from his mum.',
        reasoning:
          "he has said three times that newcastle does not do scones correctly. he misses his mum's specifically, with sultanas. arrange it with her. one week of scones from home. text him 'parcel for you in the kitchen' and go for a walk.",
        cost: '£20-£50',
      },
    ],
    do_not_get_them:
      "do not buy him a band t-shirt, a 'funny' chess set, a chess book he already owns, or anything wellness. he does not want a stranger's read on who he is.",
    one_sentence_verdict:
      'the tuning machines are the quiet hit. the ramen is the low-key one he actually wants.',
  },
  birthday: {
    three_ideas: [
      {
        title: 'grover mini rotomatics for the silvertone.',
        reasoning:
          'he keeps meaning to fix the tuners. he will never buy them for himself. they cost under £30 and will make the guitar feel new. every time he restrings it for the next five years he will remember who bought them.',
        cost: '£20-£50',
      },
      {
        title: 'a week of beginner swim lessons at city baths.',
        reasoning:
          "he said, as a joke that wasn't a joke, that being a marine biologist who can't swim is a private hypocrisy. book him the lessons. tell him he can decline. he will not decline.",
        cost: '£50-£100',
      },
      {
        title: 'a pint at the bridge tavern, unannounced.',
        reasoning:
          "his grandad drank the same stout there. his dad was just diagnosed with parkinson's. the birthday pint at the bridge tavern is the kind that sits in a chest pocket for the rest of the year.",
        cost: 'under £20',
      },
    ],
    do_not_get_them:
      'do not get him a novelty guitar pick, a beer flight kit, or anything with a whale on it.',
    one_sentence_verdict:
      'the tuners are the object. the pint at the bridge tavern is the hour he needs.',
  },
  just_because: {
    three_ideas: [
      {
        title: "dinner at kim's, on a thursday, on you.",
        reasoning:
          "he goes alone. the tonkotsu. suggest it casually. keep it under an hour. do not fill the silences.",
        cost: 'under £20',
      },
      {
        title: "his mum's sultana scones, arranged as a surprise.",
        reasoning:
          "he has said three times that newcastle's scones are wrong. arrange with his mum. a box in the post. no card. put it on the kitchen counter.",
        cost: '£20-£50',
      },
      {
        title: 'a short text. "hold on is a heavy loop. pub?"',
        reasoning:
          "he looped hold on for an hour on sunday. you heard. you did not make it a thing. text him on wednesday and offer the pub. he won't tell you he needed it but he needed it.",
        cost: 'free',
      },
    ],
    do_not_get_them:
      'do not ask him if he is okay out of nowhere. do not buy him a book on grief.',
    one_sentence_verdict:
      'the text is the one that actually helps. the scones are the one he tells his mum about.',
  },
  housewarming: null,
  family_news: {
    three_ideas: [
      {
        title: 'a pint at the bridge tavern, the same stout his grandad drank.',
        reasoning:
          "his dad was just diagnosed. his grandad drank that specific stout. take him. do not ask him how he's feeling. order him the pint. let him decide whether to talk. he might. he might not. both are okay.",
        cost: 'under £20',
      },
      {
        title: 'a short offer: "i can drive you to durham for the weekend if you want to see him."',
        reasoning:
          "he won't ask for the lift. say the sentence. do not argue. keep the offer open for four weeks without re-raising it.",
        cost: 'free',
      },
      {
        title: 'cook him his mum\'s scones, poorly.',
        reasoning:
          "get the recipe from her. try. be bad at it. give him one on a plate at 6pm on a sunday. say nothing. the act of trying is the whole gift.",
        cost: 'under £20',
      },
    ],
    do_not_get_them:
      'do not send him a sympathy card. do not forward him articles about parkinson\'s. do not mention his dad first.',
    one_sentence_verdict:
      'the pint at the bridge tavern is the one. everything else is practice for being in the room.',
  },
};

// ————————————————————————————————————————————————
// exports
// ————————————————————————————————————————————————

export const samples = [
  { person: maaPerson, notes: maaNotes, suggestions: maaSuggestions },
  { person: riyaPerson, notes: riyaNotes, suggestions: riyaSuggestions },
  { person: jamesPerson, notes: jamesNotes, suggestions: jamesSuggestions },
];

export function getSampleById(personId) {
  return samples.find((s) => s.person.id === personId);
}

export function getSampleSuggestion(personId, occasionKey) {
  const sample = getSampleById(personId);
  if (!sample) return null;
  const map = sample.suggestions;
  return map[occasionKey] || map.default || null;
}

export function isSamplePersonId(personId) {
  return personId && personId.startsWith('sample_');
}
