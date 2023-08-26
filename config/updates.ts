export type Log = {
  version: string;
  title: string;
  date: string;
  changes: string[];
};

export const changeLog: Log[] = [
  {
    version: "2.3",
    title: "Audio Production Library Content",
    date: "??? ?, 2023",
    changes: [
      "??? modules added into the Audio Production library: ? General, ? Recording, ? Mixing, ? Mastering.",
    ],
  },
  {
    version: "2.2",
    title: "Audio Production Library List",
    date: "??? ?, 2023",
    changes: [
      "Added Audio Production library page, populated with a list of planned modules.",
      "Although this library is not yet, users can see a list of the modules in Audio Production and save it to their Guitardex for future access.",
      "Added survey link to the Audio Production library page for users to request specific topics not yet shown in the list of planned modules.",
    ],
  },
  {
    version: "2.1",
    title: "Contact Form + Report Problem Form",
    date: "??? ?, 2023",
    changes: [
      "Contact form added.",
      "A link has been added to the bottom of each module for users to report errors via a partially-filled contact form.",
    ],
  },
  {
    version: "2.0",
    title: "Codebase Remake",
    date: "August 30, 2023",
    changes: [
      "For easier maintainability, website stack has remade from JavaScript/React/Gatsby to TypeScript/React/NextJS/ChakraUI/TailwindCSS.",
      "Saving functionality for multiple libraries (Techniques, Audio Production) added.",
      "Terms and defintions will be scanned upon page load and shown in a glossary.",
      "Boilerplate functionality for audio player for audio demonstration purposes.",
      "New dex linking URL usage for multiple libraries, backwards compatible with v1 (URL querie strings without t= and a= will default to techniques).",
      "The 'Continue Learning' section in each module now also shows the links for the other techniques that the continuation requires.",
    ],
  },
  {
    version: "1.0",
    title: "Public Launch",
    date: "May 1, 2022",
    changes: [
      "Launched to the public with 31 items in the Technique library: 4 Basics, 2 Articulation, 6 Harmonics, 2 Utility, 17 Percussion.",
    ],
  },
];
