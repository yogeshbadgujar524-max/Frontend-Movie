const MostWatchedMovies = [
  {
    id: 1,
    title: "Kanchana 2",
    year: 2012,
    type: "Comedy / Horror",
    price: 120,
    category: "Most Watched",
    image: "https://tse3.mm.bing.net/th/id/OIP.QfFgwnqn2upZaSdBMHi0qQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "A thought-provoking comedy that questions the Indian education system while following three friends through college life, self-discovery, and friendship. A couple of revenge seeking ghosts haunts an innocent man, and the people surrounding him, to get justice for their murders..",
    director: "Raghava Lawrence",
    writers: ["Abhijat Joshi"],
    stars: ["Raghava LawrenceTaapsee , PannuKovai , Sarala"]
  },

  {
    id: 2,
    title: "Kantara : Chapter 1",
    year: 2025,
    type: "Thriller / Action",
    price: 230,
    category: "Most Watched",
    image: "https://pbs.twimg.com/profile_images/1974125743417528321/MKYmqUb9_400x400.jpg",
    desc: `Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty era, it delves into the untamed wilderness and forgotten lore surrounding his past.
In pre-colonial Karnataka, during the Kadamba dynasty era, the ritual of Bhuta Kola takes root in the culture. Meanwhile, the seeds for the rise of Kaadubettu Shiva are also sown..`,

    director: "Rishab Shetty",
    writers: "Rishab Shetty, Anirudh Mahesh, Shanil Guru",
    stars: " Rishab Shetty, Jayaram, Rukmini Vasanth"
  },
  {
    id: 3,
    title: "120 Bahadur",
    year: 2025,
    type: "Action",
    price: 250,
    category: "Most Watched",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/120_Bahadur.jpg/250px-120_Bahadur.jpg",
    desc: `Based on a true story, the film depicts the account of the battle as recollected by an injured soldier, one of the 6 survivors who had participated in the Battle of Rezang La. The film recounts the Battle of Rezang La, considered one of the major events of the Sino-Indian War and fought on 18 November 1962, when 120 soldiers of the Charlie Company, 13 Kumaon Regiment entirely made up of Ahirs, defended their post against a 3000-strong Chinese Army contingent, inflicting on them over 1300 casualties — and make a sacrifice that could change everything.`,

    director: "Razneesh Ghai",
    writers: "Rajiv G Menon",
    stars: "Farhan Akhtar, Raashii Khanna, Vivan Bhatena, Ankit Siwach"
  },
  {
    id: 4,
    title: "Dhadak 2",
    year: 2025,
    type: "Romantic",
    price: 180,
    category: "Most Watched",
    image: "https://m.media-amazon.com/images/M/MV5BMGMwZTcyM2ItMzgwZC00ZmZkLTgwZjUtZWU0NDUwNTlmMTZlXkEyXkFqcGc@._V1_.jpg",
    desc: `In the shadow of social pressure and deep‑rooted traditions, two hearts find each other in unexpected places. When their families discover their bond, they mount fierce resistance — forcing the lovers to choose between duty and their dreams. As secrets unravel, sacrifices loom, and the world seems determined to keep them apart, they must fight to prove that true love sometimes defies every obstacle.`,

    director: "Shanaya Kapoor",
    writers: "Neha Singh, Ritu Verma",
    stars: "Jhanvi Kapoor, Ishaan Khattar"
  },
  {
    id: 5,
    title: "Sitaare Zameen Par",
    year: 2025,
    type: "Motivational",
    price: 195,
    category: "Most Watched",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Sitaare_Zameen_Par_poster.jpg/250px-Sitaare_Zameen_Par_poster.jpg",
    desc: `A beacon of hope shines when a struggling child, burdened by academic failure and low confidence, crosses paths with an unconventional yet passionate teacher. Through patience, empathy, and creative teaching, the mentor helps unveil the child’s hidden talents and inner light. Their journey is not without setbacks — but each hurdle becomes an opportunity to see beyond mistakes and celebrate potential.`,

    director: "Nikhil Sharma",
    writers: "Meera Gupta, Arjun Malhotra",
    stars: "Aamir Khan, Zaira Wasim, Tanvi Rao"
  },
  {
    id: 6,
    title: "Metro In Dino",
    year: 2025,
    type: "Romantic",
    price: 180,
    category: "Most Watched",
    image: "https://upload.wikimedia.org/wikipedia/en/6/64/Metro..._In_Dino_poster.jpg",
    desc: `Amid the hum of passing commuters and crowded platforms, two strangers share a fleeting journey on a metro. A single conversation, a shared smile, becomes the spark for deeper connection. As the train winds through city tunnels and daylight fades, they are drawn into each other’s stories — and by journey’s end, life may never be the same.`,

    director: "Pooja Shetty",
    writers: "Ankita Mehra, Rohan Joshi",
    stars: "Vijay Deverakonda, Sara Ali Khan"
  },
  {
    id: 7,
    title: "Saiyaara",
    year: 2025,
    type: "Romantic",
    price: 210,
    category: "Most Watched",
    image: "https://m.media-amazon.com/images/M/MV5BMTk2ZmFhYjctYWZiYy00N2IxLWEzMWItZGRiMDY4ZDQwZWFlXkEyXkFqcGc@._V1_.jpg",
    desc: `In the quiet corners of a rain-slicked city, an introspective artist and a wandering poet cross paths. Their conversations wander through dreams, heartbreak, and creative yearning. As their bond deepens, memories resurface and doubts arise — but sometimes, in vulnerability, we find courage and in shared silence, we find solace.`,

    director: "Ritik Mehra",
    writers: "Sonal Verma, Kabir Shah",
    stars: "Ishaan Khatter, Tara Sutaria"
  },
  {
    id: 8,
    title: "Bajrangi Bhaijaan",
    year: 2015,
    type: "Drama",
    price: 150,
    category: "Most Watched",
    image: "https://m.media-amazon.com/images/M/MV5BYzVjMjZiNGUtZjZiNy00Yzg4LWEzYzYtMmI1NDg5NWNiNjUwXkEyXkFqcGc@._V1_.jpg",
    desc: "A moving story of a kind-hearted man who helps a mute girl from Pakistan reunite with her family. A journey that transcends borders and beliefs, filled with emotion and humanity.",
    director: "Kabir Khan",
    writers: ["Vijayendra Prasad", "Kabir Khan"],
    stars: ["Salman Khan", "Harshaali Malhotra", "Nawazuddin Siddiqui"]
  },
  {
    id: 9,
    title: "Welcome",
    year: 2009,
    type: "Comedy",
    price: 100,
    category: "Most Watched",
    image: "https://upload.wikimedia.org/wikipedia/en/f/f4/Welcome_poster_2007.jpg",
    desc: "A laugh-out-loud comedy about a man who falls in love with a gangster's sister, leading to a series of hilarious and chaotic events. A Bollywood classic with a stellar ensemble cast.",
    director: "Anees Bazmee",
    writers: ["Anees Bazmee", "Rajiv Kaul"],
    stars: ["Akshay Kumar", "Katrina Kaif", "Anil Kapoor", "Nana Patekar"]
  },
  {
    id: 10,
    title: "Dhamaal",
    year: 2007,
    type: "Comedy",
    price: 100,
    category: "Most Watched",
    image: "https://upload.wikimedia.org/wikipedia/en/6/60/Dhamaal_2007.jpg",
    desc: "Four jobless friends stumble upon a hidden treasure map that leads to a hilarious treasure hunt filled with absurd situations, quirky characters, and slapstick humor.",
    director: "Indra Kumar",
    writers: ["Paritosh Painter", "Indra Kumar"],
    stars: ["Riteish Deshmukh", "Arshad Warsi", "Javed Jaffrey", "Sanjay Dutt"]
  },
  {
    id: 11,
    title: "3 Idiots",
    year: 2009,
    type: "Comedy",
    price: 120,
    category: "Most Watched",
    image: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_.jpg",
    desc: "A thought-provoking comedy that questions the Indian education system while following three friends through college life, self-discovery, and friendship. Inspiring and unforgettable.",
    director: "Rajkumar Hirani",
    writers: ["Abhijat Joshi"]
  },

  {
    id: 12,
    title: "The Taj Story",
    year: 2025,
    type: "Historic",
    price: 200,
    category: "Most Watched",
    image: "https://m.media-amazon.com/images/M/MV5BOTY3NGM0MjYtYWI3MS00MmIxLTk0ZTAtNTI2MWU1OWRlODU5XkEyXkFqcGc@._V1_.jpg",
    desc: `The Taj Story generally received negative reviews from the critics.Komal Nahta of Film Information described The Taj Story as “a thought-provoking film and entertaining.”[22] Lachmi Deb Roy of Firstpost gave the film 2 out of 5 stars, calling it “overstretch,” and wrote, “The story had all it needed to make for a good film, but weak script and bad execution massacred it all.”[23] Ritika Srivastav of India Today awarded it 2.5 stars, writing, “The accents are genuinely impressive, and there are flashes of clever use of AI-generated visuals. But none of it compensates for the film’s glaring weaknesses: the lazy writing, the filler female characters, and the total lack of focus.”[24]
Shubhangi Shah, writing for The Week wrote, "The Taj Story falls flat and not just as a propaganda film, because I can dare even the firm rightwing supporters to sit through this three-hour-long film, which can be a test for both your patience as well as intellect."[25] Saibal Chatterjee, writing for NDTV, rated the movie at 2/5 and concluded, "The Taj Story is a throw of dice that is all over the place. Even Paresh Rawal cannot save it..`,
    director: "Razneesh Ghai",
    writers: "Rajiv G Menon",
    stars: "Farhan Akhtar, Raashii Khanna, Vivan Bhatena, Ankit Siwach"
  },
  
]
export default MostWatchedMovies