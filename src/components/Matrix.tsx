import { useEffect, useMemo, useRef } from 'react';

interface Props {
  height: number,
  width: number
}

const Matrix = ({ height, width }: Props): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const canvas = useMemo(
    () => (<canvas ref={ref} height={height} width={width} />),
    [width, height],
  );

  useEffect(() => {
    if (!ref.current || !canvas) return () => undefined;
    const myCanvas = ref.current;
    const ctx = myCanvas.getContext('2d') as CanvasRenderingContext2D;

    const w = myCanvas.width;
    const h = myCanvas.height;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0).map(() => -20 * Math.floor(Math.random() * 20));

    const interval = window.setInterval(() => {
      ctx.fillStyle = '#0001';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);

        const x = ind * 20;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [canvas]);

  return canvas;
};

export default Matrix;
