import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createElement, ReactNode, useState } from 'react';

const Page = ({ children }: { children: ReactNode }): JSX.Element => (
  <div
    className="w-full shrink-0 bg-white text-black shadow shadow-black p-4 aspect-[1/1.4142]"
  >
    { children }
  </div>
);

const Skills = (): JSX.Element => <Page>skills</Page>;

const pages = [
  { id: 'skills', page: Skills },
];

const SkillsPDF = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const changePage = (change: number) => {
    let nextPage = page + change;
    if (nextPage < 1) nextPage = 1;
    else if (nextPage > pages.length) nextPage = pages.length;
    setPage(nextPage);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 h-8 flex items-center px-8 border-y border-neutral-300 dark:border-transparent bg-white dark:bg-neutral-900">
        <div className="mx-auto flex items-center gap-2 text-sm leading-none">
          <button
            className="disabled:opacity-40 disabled:cursor-not-allowed"
            type="button"
            disabled={page < 2}
            onClick={() => changePage(-1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="font-bold">
            <span>{ page }</span>
            <span className="mx-0.5">/</span>
            <span>{ pages.length }</span>
          </div>
          <button
            className="disabled:opacity-40 disabled:cursor-not-allowed"
            type="button"
            disabled={page >= pages.length}
            onClick={() => changePage(1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <div className="grow overflow-auto py-8">
        <div className="max-w-2xl w-full px-2 mx-auto flex flex-col items-center gap-8">
          {
            pages.map((pageItem) => (
              createElement(pageItem.page, { key: pageItem.id })
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SkillsPDF;
