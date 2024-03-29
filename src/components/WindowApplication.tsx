import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler, useEffect, useState } from 'react';
import { ApplicationItem } from '../slices/appsSlice';

interface Props {
  app: ApplicationItem
}

const WindowApplication = ({ app }: Props): JSX.Element => {
  const [reload, setReload] = useState(false);

  const url = new URL(app.url);

  const selectText: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget as HTMLInputElement;
    const range = document.createRange();
    const sel = window.getSelection();
    target.focus();
    range.selectNodeContents(target);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  useEffect(() => {
    setReload(false);
  }, [reload]);

  return (
    <>
      <div
        className={[
          'shrink-0 h-9 px-2 py-1',
          'border-b dark:border-white/20 border-black/20 flex items-center dark:text-white text-neutral-600',
        ].join(' ')}
      >
        <div className="shrink-0">
          <button
            type="button"
            className="transition-all duration-200 hover:bg-white/10 w-7 h-7 rounded-full"
            onClick={() => setReload(true)}
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <div className="grow px-2 text-sm h-full">
          <div
            className="rounded-full h-full dark:bg-neutral-800 bg-gray-100 text-ellipsis whitespace-nowrap overflow-hidden"
          >
            <div
              role="textbox"
              tabIndex={0}
              className={[
                'transition-all duration-200 dark:hover:bg-white/5 hover:bg-black/5',
                'w-full h-full rounded-full px-4',
                'cursor-text flex items-center',
                'border-2 border-transparent focus:border-blue-400',
              ].join(' ')}
              onClick={selectText}
              onKeyDown={() => undefined}
            >
              <div>
                <span className="text-black dark:text-white">{ url.hostname }</span>
                <span className="dark:text-neutral-400 text-neutral-500">
                  { url.port && (
                    <>
                      <span>:</span>
                      <span>{ url.port }</span>
                    </>
                  )}
                  { url.pathname && <span>{ url.pathname }</span>}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1">
          <a
            href={app.url}
            target="_blank"
            className="transition-all duration-200 hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faExternalLink} />
          </a>
          { app.githubUrl && (
            <a
              href={app.githubUrl}
              target="_blank"
              className="transition-all duration-200 hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          ) }
        </div>
      </div>
      { !reload && (
      <div className="grow overflow-hidden">
        <iframe
          className="h-[calc(100vh-7rem)] w-screen"
          title={app.name}
          src={app.url}
        />
      </div>
      ) }
    </>
  );
};

export default WindowApplication;
