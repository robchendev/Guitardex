export type Log = {
  version: string;
  title: string;
  date: string;
  changes: string[];
};

export const changeLog: Log[] = [
  // {
  //   version: "2.3",
  //   title: "Optimization: Pre-build Audio Buffers",
  //   date: "??? ?, 2023",
  //   changes: [
  //     "Build audio buffers server-side to reduce the load on the client-side when loading Audio Production modules.",
  //   ],
  // },
  // {
  //   version: "2.2",
  //   title: "Optimization: Library Glossary",
  //   date: "??? ?, 2023",
  //   changes: [
  //     "Terms and definitions in every module within a library will be scanned when building production packages server-side and shown in a glossary at the top of the library list.",
  //   ],
  // },
  // {
  //   version: "2.1",
  //   title: "Optimization: Large Media Storage",
  //   date: "??? ?, 2023",
  //   changes: [
  //     "Build audio buffers at build time to serve immediately on client-side.",
  //     "Moved all bulky images to an external media storage.",
  //     "Reduced flash of unstyled content caused by inefficient dynamically generated content.",
  //   ],
  // },
  // {
  //   version: "2.0",
  //   title: "Audio Production Library Content",
  //   date: "??? ?, 2023",
  //   changes: [
  //     "??? modules added into the Audio Production library: ? General, ? Recording, ? Mixing, ? Mastering.",
  //   ],
  // },
  {
    version: "1.7",
    title: "Audio Production Module Features & Test",
    date: "September 1, 2023",
    changes: [
      "The new features of v1.1 - v1.6 are launched to a select group of desktop volunteer users to test.",
    ],
  },
  {
    version: "1.6",
    title: "Audio Production Library List",
    date: "September 1, 2023",
    changes: [
      "Added Audio Production library page, populated with an incomplete list of planned modules.",
      // "Although this library is not released yet, users can see a list of the modules in Audio Production and save it to their Guitardex for future access.",
    ],
  },

  {
    version: "1.5",
    title: "Contact Form",
    date: "September 1, 2023",
    changes: [
      "Added contact form page with Email, Topic, Subject and Message as the default required fields.",
      'When on topic "Content Request", Email, Module Library and Message are required.',
      'When on topic "Report Issue", Email, Module Library, Module ID and Message are required.',
      "Added a report issue link on the bottom of each module page that autofills the contact form's Topic, Module Library and Module ID fields.",
      "Added a content request link at the top of each library page that autofills the contact form's Topic and Module Library fields.",
    ],
  },
  {
    version: "1.4",
    title: "Audio Comparison Feature",
    date: "August 31, 2023",
    changes: [
      "Added an audio comparison feature that demonstrates the before and after of an applied effect using sound for auditory representation and waveform for visual representation.",
      "Added generic controls such as play, pause and volume.",
      "Added seek control on waveform click with a cursor indicating current playback position.",
      "Added bypass button to switch between before and after audio.",
      "All audio files used through this feature will be uploaded 192kbps, 44.1kHz, and 16-bit.",
    ],
  },
  {
    version: "1.3",
    title: "Multiple Libraries",
    date: "August 28, 2023",
    changes: [
      "Saving functionality for multiple libraries (Techniques, Audio Production) added.",
      "New dex linking URL usage for multiple libraries, backwards compatible with v1.0 (URL query strings without t= and a= will default to techniques).",
    ],
  },
  {
    version: "1.2",
    title: "Module Glossary",
    date: "August 24, 2023",
    changes: [
      "Terms and definitions will be scanned when loading the page and shown in a glossary at the top of the module page.",
    ],
  },
  {
    version: "1.1",
    title: "Codebase Remake",
    date: "August 22, 2023",
    changes: [
      "For easier maintainability, website stack has remade from JavaScript/React/Gatsby to TypeScript/React/NextJS/ChakraUI/TailwindCSS.",
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
  {
    version: "0.9",
    title: "Test",
    date: "April 29, 2022",
    changes: ["Guitardex is launched to a select group of volunteer end-user testers."],
  },
  {
    version: "0.8",
    title: "Videos and Notation",
    date: "April 27, 2022",
    changes: [
      "Proofread written and notation content to be consistent with the video content.",
      "Added techniques' notation content for the public release with IDs 1-31.",
      "Added techniques' video content for the public release with IDs 1-31.",
    ],
  },
  {
    version: "0.7",
    title: "Module Continuation",
    date: "April 24, 2022",
    changes: [
      "Module pages (currently only techniques) now have a 'Continue learning...' section at the bottom of the page that links modules that have the current page's module as a pre-requisite. Other pre-requisites of the linked technique are also listed as required.",
      "Added drafts of all the techniques' written content for the public release with IDs 1-32.",
    ],
  },
  {
    version: "0.6",
    title: "UI Overhaul",
    date: "April 18, 2022",
    changes: [
      "Guitardex profile names are now displayed as the page heading to make the profile name have more visual impact instead of 'My Guitardex' with an input box below. Unnamed profiles now have a placeholder of 'My Guitardex' displayed above instead.",
      "A maximum character length of 24 is now shown with a counter when editing the profile.",
      "Guitardex now shows a drag icon when hovered.",
      "Techniques search page and Guitardex now shows color coded difficulty markers.",
      "Techniques search page now shows category markers.",
      "Guitardex now shows category and group markers.",
      "Technique pages now has the page header (reqs, difficulty, group, category, save button) visibly separate from the content below.",
    ],
  },
  {
    version: "0.5",
    title: "Improved Technique Button UI",
    date: "April 8, 2022",
    changes: [
      "Added pages Help, About, and Community. Development (this) page was also added.",
      "Changed technique buttons from box and checkmark to save icon and checkmark.",
      "Revamped save button and delete button UI to be more minimalistic.",
      "Bug Fix: Erasing Guitardex name using CTRL/CMD hotkeys now work.",
    ],
  },
  {
    version: "0.4",
    title: "My Guitardex",
    date: "March 24, 2022",
    changes: [
      "'My Guitardex' page displays the saved techniques of the end-user.",
      "Encodes the save configuration to a short URL to share the user's Guitardex with others.",
      "Added automatic decoding of a custom Guitardex URL upon visit to the site via the URL.",
      "Added a way to delete individual entries of the Guitardex.",
      "Added a way to delete all entries of the Guitardex.",
      "Added a way to re-order entries of the Guitardex, which also updates the Guitardex's browser save accordingly.",
    ],
  },
  {
    version: "0.3",
    title: "Technique Library Search and Modules",
    date: "March 2, 2022",
    changes: [
      "Created the content structure to individually generate technique pages.",
      "Created template skeletons of what the technique pages would look like.",
      "Added a Searchbar that queries search terms of the technique titles and their tags.",
      "Added Guitardex browser saving functionality and put a save button on the Searchbar page and each individual technique page.",
    ],
  },
  {
    version: "0.2",
    title: "Dark Mode",
    date: "February 19, 2022",
    changes: [
      "Allows end-users to freely toggle between light and dark theme (defaults to light).",
      "User's browser remembers the color mode preference of the end-user.",
    ],
  },
  {
    version: "0.1",
    title: "Website Skeleton",
    date: "February 04, 2022",
    changes: ["The start of this website."],
  },
];
