'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ymaps?: any;
  }
}

export const YandexPanorama = () => {
  const [ymaps, setYmaps] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.ymaps) {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=7892edcb-2e86-4654-9d79-67b78271608c&lang=ru_RU`;
      script.type = 'text/javascript';
      script.onload = () => setYmaps(window.ymaps);
      document.body.appendChild(script);
    } else {
      setYmaps(window.ymaps);
    }
  }, []);

  useEffect(() => {
    if (ymaps) {
      ymaps.ready(() => {
        const panoramaContainer = document.getElementById('panorama');
        if (!panoramaContainer) return;

        ymaps.panorama.locate([55.548165, 38.189895]).then((panoramas: any) => {
          if (panoramas.length > 0) {
            const newPlayer = new ymaps.panorama.Player(
              'panorama',
              panoramas[0],
              {
                direction: [14.735201, -1.384884], // Направление камеры
                span: [117.009176, 60.0], // Угол обзора (Zoom)
                // controls: [], // Отключаем стандартные контроллы
              }
            );

            setPlayer(newPlayer);
          }
        });
      });
    }
  }, [ymaps]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div id="panorama" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
