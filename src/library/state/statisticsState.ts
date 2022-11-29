import { selector } from 'recoil';
import { notesState } from './notesState';
import { foldersState } from './foldersState';

const generatePieChartDataStructure = ({
  numLinkNotes,
  numTextNotes,
}: {
  numLinkNotes: number;
  numTextNotes: number;
}) => {
  return [
    {
      value: numTextNotes,
      svg: {
        fill: '#0A8877',
      },
      key: 'pie-text-notes',
    },
    {
      value: numLinkNotes,
      svg: {
        fill: '#EE786B',
      },
      key: 'pie-links',
    },
  ];
};

export const statisticsData = selector({
  key: 'StatisticsData',
  get: ({ get }) => {
    const notes = get(notesState);
    const folders = get(foldersState);

    const totalNumNotes = notes.length;
    const totalNumFolders = folders.length;
    const numLinkNotes = notes.filter(n => n.isLink).length;
    const numTextNotes = notes.length - numLinkNotes;
    const numFavorites = notes.filter(n => n.isFavorite).length;
    const pieChartData = generatePieChartDataStructure({
      numLinkNotes,
      numTextNotes,
    });

    return {
      totalNumNotes,
      totalNumFolders,
      numLinkNotes,
      numTextNotes,
      numFavorites,
      pieChartData,
    };
  },
});
