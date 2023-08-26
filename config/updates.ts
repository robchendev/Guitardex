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
      "Although this library is not released yet, users can see a list of the modules in Audio Production and save it to their Guitardex for future access.",
      "Added survey link to the Audio Production library page for users to request specific topics not yet shown in the list of planned modules.",
    ],
  },
  {
    version: "2.1",
    title: "Contact Form + Report Problem Form",
    date: "??? ?, 2023",
    changes: [
      "Added a contact form page.",
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
  {
    version: "0.9",
    title: "Testing Launch",
    date: "Apr 29, 2022",
    changes: ["Guitardex is launched to a select group of volunteer end-user testers."],
  },
  {
    version: "0.8",
    title: "Videos and Notation",
    date: "Apr 27, 2022",
    changes: [
      "Proofread written and notation content to be consistent with the video content.",
      "Added techniques' notation content for the public release with IDs 1-31.",
      "Added techniques' video content for the public release with IDs 1-31.",
    ],
  },
  {
    version: "0.7",
    title: "Technique Continuation",
    date: "Apr 24, 2022",
    changes: [
      "Technique pages now have a 'Continue learning...' section at the bottom of the page that links techniques that have the current page's technique as a pre-requisite. Other pre-requisites of the linked technique are also listed as required.",
      "Added drafts of all the techniques' written content for the public release with IDs 1-32.",
    ],
  },
  {
    version: "0.6",
    title: "UI Overhaul",
    date: "Apr 18, 2022",
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
    date: "Apr 8, 2022",
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
    date: "Mar 24, 2022",
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
    date: "Mar 2, 2022",
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
    date: "Feb 19, 2022",
    changes: [
      "Allows end-users to freely toggle between light and dark theme (defaults to light).",
      "User's browser remembers the color mode preference of the end-user.",
    ],
  },
  {
    version: "0.1",
    title: "Website Skeleton",
    date: "Feb 04, 2022",
    changes: ["The start of this website."],
  },
];
