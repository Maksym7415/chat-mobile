export const typesTabsFooter = {
  gallery: 'gallery',
  file: 'file',
  location: 'location',
  contact: 'contact',
  music: 'music',
};

export const tabsFooter = lang => [
  {
    id: 1,
    title: 'Gallery',
    type: typesTabsFooter.gallery,
    icon: {
      name: 'svgs_filled_gallery_attach',
    },
    styles: {
      backgroundColor: '#459DF6',
    },
  },
  {
    id: 2,
    title: 'File',
    type: typesTabsFooter.file,
    icon: {
      name: 'svgs_filled_file_attach',
    },
    styles: {
      backgroundColor: '#34B9F1',
    },
  },
  {
    id: 3,
    title: 'Location',
    type: typesTabsFooter.location,
    icon: {
      name: 'svgs_filled_map_point_attach',
    },
    styles: {
      backgroundColor: '#60C255',
    },
  },
  {
    id: 4,
    title: 'Contact',
    type: typesTabsFooter.contact,
    icon: {
      name: 'svgs_filled_user_attach',
    },
    styles: {
      backgroundColor: '#EB6161',
    },
  },
  {
    id: 5,
    title: 'Music',
    type: typesTabsFooter.music,
    icon: {
      name: 'svgs_filled_play_attach',
    },
    styles: {
      backgroundColor: '#EB6161',
    },
  },
];
