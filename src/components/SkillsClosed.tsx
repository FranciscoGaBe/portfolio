import { faAsterisk, faLock, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Matrix from './Matrix';

interface Props {
  setOpen: (open: boolean) => void
}

const lines = [
  'echo "const hacked = process.env.HACKED;" >> portfolio.html',
  // eslint-disable-next-line no-template-curly-in-string
  'echo "console.log(`Password: ${skill.password}`);" >> portfolio.html',
  'echo "console.log(\'I am in 😎👍\');" >> portfolio.html',
  'run node portfolio.html --HACKED=true',
  '',
];

const Hack = ({ setOpen }: Props): JSX.Element => {
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [commands, setCommands] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const line = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...new (Intl as any).Segmenter().segment(lines[index]),
  ].map((c, i) => ({ id: (index * 1e3) + i, c: c.segment as string }));
  const wordControls = useAnimation();

  useEffect(() => {
    if (running) return;
    setRunning(true);
    const animate = async () => {
      await wordControls.start((i: number) => ({
        display: 'block',
        transition: {
          delay: 0.6 + i * 0.03,
        },
      }));
      if (index < (lines.length - 1)) {
        setCommands((prevState) => [...prevState, lines[index]]);
        setIndex(index + 1);
        wordControls.set({ display: 'none' });
        setRunning(false);
        return;
      }
      setDone(true);
      setTimeout(() => setOpen(true), 3000);
    };
    animate();
  }, [running, wordControls, index, setOpen]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full h-full relative flex items-center justify-center"
    >
      <button
        className="absolute top-0 right-0 font-bold text-[#0f0] [filter:drop-shadow(0px_0px_2px_rgb(255,255,255,0.7))]"
        type="button"
        onClick={() => setOpen(true)}
      >
        SKIP
      </button>
      <div className="border border-main w-full max-w-2xl">
        <div className="bg-main px-2 py-1">
          <span className="mr-2 text-xs">
            <FontAwesomeIcon icon={faTerminal} />
          </span>
          <span className="text-sm">Command Prompt</span>
        </div>
        <div className="bg-neutral-900 h-96 p-1 text-neutral-200 font-thin">
          <div className="leading-4 mb-4">
            <p>Francisco&apos;s Portfolio [Version 1.0.14021992.0905]</p>
            <p>(c) Francisco José Garrido Bear. All rights reserved.</p>
          </div>
          {
            commands.map((command) => (
              <div key={command} className="flex items-center flex-wrap leading-5 break-all mb-2">
                <p>
                  C:\Francisco\Portfolio&gt;
                  { command }
                </p>
              </div>
            ))
          }
          { done && (
          <motion.div
            initial={{ display: 'none' }}
            animate={{ display: 'block' }}
            transition={{ delay: 0.5 }}
            className="text-sm font-bold"
          >
            <p>I am in 😎👍</p>
            <p>Password: 14021992</p>
          </motion.div>
          ) }
          <div className="flex items-center flex-wrap leading-5 mb-2">
            <p>C:\Francisco\Portfolio&gt;</p>
            {
              line.map(({ id, c }, i) => (
                <motion.div
                  key={id}
                  custom={i}
                  initial={{ display: 'none', width: c === ' ' ? '0.267em' : 'auto' }}
                  animate={wordControls}
                >
                  { c }
                </motion.div>
              ))
            }
            <motion.div
              animate={{
                opacity: [0, 0, 1],
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.95, 1],
                repeat: Infinity,
                repeatDelay: 0.6,
              }}
              className="w-2 h-4 border-b-4 border-neutral-200"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Password = ({ setOpen }: Props): JSX.Element => {
  const [password, setPassword] = useState('');
  const [testing, setTesting] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hacking, setHacking] = useState(false);
  const lockControls = useAnimation();
  const passwordControls = useAnimation();
  const floatingPasswordSlots = Array(8).fill(0).map((_, index) => index + 1);

  const testPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (testing) return;
    setTesting(true);
    await passwordControls.start((index: number) => ({
      left: '50%',
      top: '50%',
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }));
    if (password === '14021992') setSuccess(true);
    else setWrong(true);
  };

  useEffect(() => {
    if (!wrong) return;
    const animate = async () => {
      lockControls.set({
        color: 'rgb(220, 38, 38)',
      });
      await lockControls.start({
        x: [-5, 5, -5],
        transition: {
          duration: 0.2,
          times: [0, 0.5, 1],
          repeat: 2,
          repeatDelay: 0,
        },
      });
      lockControls.set({
        color: 'rgb(0, 255, 0)',
      });
      await passwordControls.start((index: number) => ({
        left: `calc(50% - 11.5rem + ${index * 3}rem)`,
        top: 0,
      }));
      setTesting(false);
      setWrong(false);
    };
    animate();
  }, [wrong, lockControls, passwordControls]);

  useEffect(() => {
    if (!success) return;
    const animate = async () => {
      lockControls.set({
        color: 'rgb(22, 163, 74)',
      });
      await lockControls.start({
        scale: 14,
        transition: {
          delay: 0.5,
          duration: 0.5,
          ease: 'easeOut',
        },
      });
      setOpen(true);
    };
    animate();
  }, [success, lockControls, setOpen]);

  return (
    <>
      <div className="absolute left-0 right-0 bottom-0 top-8 text-4xl text-[#0f0] [filter:drop-shadow(0px_0px_2px_rgb(255,255,255,0.7))]">
        {
            floatingPasswordSlots.map((id, index) => (
              <motion.div
                key={id}
                custom={index}
                animate={passwordControls}
                className="absolute"
                style={{ top: 0, left: `calc(50% - 11.5rem + ${index * 3}rem)` }}
              >
                <motion.div
                  custom={index}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    delay: index * 0.2,
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                  }}
                >
                  <AnimatePresence>
                    { (index < password.length) && (

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FontAwesomeIcon icon={faAsterisk} />
                    </motion.div>

                    ) }
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))
          }
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-[#0f0] [filter:drop-shadow(0px_0px_2px_rgb(255,255,255,0.7))]">
        <motion.div
          animate={lockControls}
        >
          <FontAwesomeIcon className="text-[20rem]" icon={faLock} />
        </motion.div>
      </div>
      <AnimatePresence exitBeforeEnter>
        { !hacking && (
        <motion.form
          key="form"
          exit={{ scale: 0, opacity: 0 }}
          className="bg-gray-200/90 relative px-4 py-2 rounded-lg text-neutral-800 shadow"
          onSubmit={testPassword}
        >
          <p className="text-2xl mb-4 font-bold">A password is required to view this file</p>
          <div className="mb-4">
            <input
              className="rounded py-1 px-2 border-2 border-neutral-400 focus:border-neutral-600 outline-none w-full"
              type="password"
              placeholder="Password (Max len: 8)"
              max={8}
              value={password}
              onInput={(event) => setPassword((event.target as HTMLInputElement).value.slice(0, 8))}
            />
          </div>
          <div className="flex items-center justify-evenly text-white">
            <div className="w-1/2 pr-1">
              <div className="bg-main rounded">
                <button
                  className="rounded py-2 bg-black/40 w-full"
                  type="submit"
                >
                  Enter
                </button>
              </div>
            </div>
            <div className="w-1/2 pl-1">
              <button
                className="bg-red-600 rounded py-2 w-full"
                type="button"
                onClick={() => setHacking(true)}
              >
                Try hacking!
              </button>
            </div>
          </div>
        </motion.form>
        ) }
        { hacking && (
        <Hack key="hack" setOpen={setOpen} />
        ) }
      </AnimatePresence>
    </>
  );
};

const SkillsClosed = ({ setOpen }: Props): JSX.Element => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return () => undefined;
    const getDimensions = () => {
      if (!node) return;
      const { height: newHeight, width: newWidth } = node.getBoundingClientRect();
      setHeight(newHeight);
      setWidth(newWidth);
    };
    const timeout = window.setTimeout(() => getDimensions(), 300);
    return () => window.clearTimeout(timeout);
  }, [node]);

  return (
    <div className="h-full w-full bg-black relative flex items-center justify-center p-4">
      <div
        ref={setNode}
        className="absolute inset-0"
      >
        <Matrix height={height} width={width} />
      </div>
      <Password setOpen={setOpen} />
    </div>
  );
};

export default SkillsClosed;
