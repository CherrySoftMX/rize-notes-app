import { selector } from 'recoil';
import { notesState } from './notesState';
import { foldersState } from './foldersState';
import { Folder } from '../../library/interfaces/Folder';
import { labelColors } from '@organisms/BiggerFoldersChart';
import { Note } from '../../library/interfaces/Note';

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

    const barChartData = generateBarChartDataStructure(folders);

    const { lineChartData, lineChartDataLabels } =
      generateLineChartDataStructure(notes);

    return {
      totalNumNotes,
      totalNumFolders,
      numLinkNotes,
      numTextNotes,
      numFavorites,
      pieChartData,
      barChartData,
      lineChartData,
      lineChartDataLabels,
    };
  },
});

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

const generateBarChartDataStructure = (folders: Array<Folder>) => {
  const _folders = [...folders];
  _folders.sort((a, b) => {
    if (a.noteIds.length > b.noteIds.length) {
      return -1;
    } else if (a.noteIds.length < b.noteIds.length) {
      return 1;
    }
    return 0;
  });
  const NUM_OF_FOLDERS_TO_PICK = 4;
  const size =
    _folders.length < NUM_OF_FOLDERS_TO_PICK
      ? _folders.length
      : NUM_OF_FOLDERS_TO_PICK;
  const selectedFolders = _folders.slice(0, size);
  const chartData = selectedFolders.map((f, index) => {
    return {
      value: f.noteIds.length,
      label: f.name,
      key: `folder-${index}`,
      svg: {
        fill: labelColors[index],
        opacity: 0.9,
      },
    };
  });
  return chartData;
};

const generateLineChartDataStructure = (notes: Array<Note>) => {
  const DAYS_OF_WEEK = 7;

  const currentDate = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - DAYS_OF_WEEK + 1);
  lastWeek.setHours(0, 0, 0);

  const lastWeekNotes = notes.filter(note => {
    const noteDate = new Date(note.createAt);
    return noteDate.getTime() >= lastWeek.getTime();
  });

  const lineChartData: Array<number> = [];
  const lineChartDataLabels: Array<string> = [];
  for (let day = lastWeek.getDate(); day <= currentDate.getDate(); day++) {
    const notesPerDay = lastWeekNotes.filter(note => {
      const noteDate = new Date(note.createAt);
      return noteDate.getDate() === day;
    });
    lineChartData.push(notesPerDay.length);

    const dayData = new Date();
    dayData.setDate(day);
    const dayString = dayData.toUTCString().slice(0, 3);
    lineChartDataLabels.push(dayString);
  }
  return {
    lineChartData,
    lineChartDataLabels,
  };
};
