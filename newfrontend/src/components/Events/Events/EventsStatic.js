import KDSH2020 from "../../../assets/pics/events/KDSH2020.jpg";
import SummerAI from "../../../assets/pics/events/SummerAIChallenge.jpg";
import KDSH2021 from "../../../assets/pics/HACKPoster.png";
import WW21 from "../../../assets/pics/WW21.png";
import KDSH2022 from "../../../assets/pics/events/KDSH2022_Latest.png";
import python_workshop_2023 from "../../../assets/pics/events/python_workshop_2022.png";
import convolve_2024 from "../../../assets/pics/events/covolve_2024.webp";
import LLM_2024 from "../../../assets/pics/events/LLM_2024.webp";
import KDSH_2024 from "../../../assets/pics/events/KDSH_2024.webp";
import campus_pulse2024 from "../../../assets/pics/events/Campus_pulse2024.png";
import ML_Workshop2024 from "../../../assets/pics/events/ML_Workshop2024.png";
import NEST from "../../../assets/pics/events/NEST.jpg";
import Convolve_2025 from "../../../assets/pics/events/Convolve_2025.jpg";
import KDSH_2025 from "../../../assets/pics/events/KDSH_2025.jpg";
import IntraKDAG from "../../../assets/pics/events/IntraKDAG.jpg";
import Elyx from "../../../assets/pics/events/elyx.jpeg";

const events = [

    {
        id: 0,
        title: "Elyx Life Hackathon",
        location: "Online",
        date: "15th August 2025 - 17th August 2025",
        link: "https://www.instagram.com/p/DNCviDXPne8/?utm_source=ig_web_copy_link&igsh=bTIyODN0aTEyaDR0",
        image: Elyx,
    },
    {
        id: 1,
        title: "Convolve 2025",
        location: "Online",
        date: "10th January 2025 - 6th February 2025",
        link: "https://unstop.com/o/4st5JEq?utm_medium=Share&utm_source=shortUrl",
        image: Convolve_2025,
    },
    {
        id: 2,
        title: "Kharagpur Data Science Hackathon 2025",
        location: "Unstop",
        date: "2nd January 2025 - 19th January 2025",
        link: "https://unstop.com/o/GEtxVdJ?lb=sqXVRSum&utm_medium=Share&utm_source=WhatsApp",
        image: KDSH_2025,
    },
    {
        id: 3,
        title: "NEST- Nurturing Excellence, Strengthening Talent",
        location: "Online",
        date: "9th December 2024 - 20th February 2025",
        link: "https://unstop.com/o/4st5JEq?utm_medium=Share&utm_source=shortUrl",
        image: NEST,
    },
    {
        id: 4,
        title: "Spring of Realtime LLMs Bootcamp 2024",
        location: "Online",
        date: "2nd March 2024 - 25th March 2024",
        link: "https://unstop.com/o/K4h6B1e?lb=Yxt5XWS",
        image: LLM_2024,
    },
    {
        id: 5,
        title: "Convolve 2024",
        location: "MS Teams",
        date: "5th January 2024 - 11th February 2024",
        link: "https://unstop.com/o/TsxQmJG?lb=1EjPtbV",
        image: convolve_2024,
    },
    {
        id: 6,
        title: "Kharagpur Datascience Hackathon 2024",
        location: "Unstop",
        date: "25th December 2023 - 21st January 2024",
        link: "https://unstop.com/o/3zC06FR?lb=DlVrQAs",
        image: KDSH_2024,
    },
    {
        id: 7,
        title: "Machine Learning Workshop 2023",
        location: "Nalanda Classroom Complex, NC111",
        date: "4th November 2023 - 5th November 2023",
        image: ML_Workshop2024,

    },
    {
        id: 8,
        title: "Campus Pulse 2023",
        location: "IIT Kharagpur",
        date: "13th November, 2023 - 15th January, 2024",
        image: campus_pulse2024,
        resources: "https://docs.google.com/document/d/1bFgQODQLFZLzT8UNobxP3KhZWFmCjnyLMLu2o_m-sVE/edit?tab=t.0",
    },
    {
        id: 9,
        title: "Python Workshop 2023",
        location: "Nalanda Classroom Complex, NR221",
        date: "1st April 2023 - 2nd April 2023",
        image: python_workshop_2023,
        resources: "https://drive.google.com/drive/folders/1iQgB8yL8Pg42AsJ-yyJCFftQKy-KL1en?usp=share_link",
    },
    {
        id: 10,
        title: "Kharagpur Data Science Hackathon 2022",
        location: "Dare2Compete",
        date: "16th December 2022 - 25th January 2023",
        // link: "/KDSH2022",
        link: "https://unstop.com/hackathons/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463",
        image: KDSH2022,
    },

    {
        id: 11,
        title: "Winter Workshop 2021",
        location: "MS Teams",
        date: "Starting 16th Dec 2021",
        image: WW21,
        // resources: "/winter-workshop",
        resources: "https://www.kdagiitkgp.org/winter-workshop"
    },
    {
        id: 12,
        title: "Kharagpur Data Science Hackathon 2021",
        location: "Dare2Compete",
        date: "20th Nov 2021 - 7th Dec 2021",
        link: "http://tinyurl.com/kdshreg",
        image: KDSH2021,
        certificates: "/certificate",
    },
    {
        id: 13,
        title: "Summer AI Challenge 2021",
        location: "Dare2Compete",
        date: "1st May 2021 - 8th May 2021",
        link: "https://dare2compete.com/o/summer-ai-challenge-indian-institute-of-technology-iit-kharagpur-161678?fbclid=IwAR04rjavk6rd5_8wTrSjVj3jJBpFEhnrjXePqDxid_bGRT51ZDcPlID3XXo",
        image: SummerAI,
    },
    {
        id: 14,
        title: "Kharagpur Data Science Hackathon, 1st Edition",
        location: "Dare2Compete",
        date: "15th March 2021 - 6th April 2021",
        link: "https://dare2compete.com/o/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70",
        image: KDSH2020,
    }
];

export default events;