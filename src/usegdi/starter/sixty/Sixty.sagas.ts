import { actions, selectors } from '@gdi/store-base';
import { toast } from '@gdi/ui';
import {
  animateCamera,
  animateGround,
  animateMesh,
  arcCamera,
  hideBackground,
  initSkyBox,
  moveMesh,
  positionCamera,
  showBackground,
  showGround,
  addSkyPlane,
  switchCamera,
} from 'isokit';
import { invokeEvent } from 'shared-base';
import { call, cancel, delay, fork, put, select, takeEvery, takeLatest } from '../../../helpers';
import { car } from './Sixty.data';
import { Queue } from './Sixty.queue';
import { playAmbience, stopAudio } from './utils/audio';

export let scene: any, task: any;

const START_AT = 0;
const STOP_AT = 65;

export function* startAnimation() {
  const transcript = yield* select(selectors.base.$transcriptForAnimation);

  const queue = new Queue(scene);
  return;
  animateGround('g1', { toPosition: { x: -40, y: 0, z: 40 } });

  yield call(playAmbience, 'modelz', 'http://localhost:3001/sounds/modelz/modelz.mp3', {
    startTime: START_AT,
    stopTime: STOP_AT,
    volume: 0,
    callback: (t: number) => {
      queue.onTime(t * 1000);
    },
  });

  yield call(playAmbience, 'modelz-voice', 'http://localhost:3001/sounds/modelz/modelz-voice.mp3',  {
    startTime: START_AT,
    stopTime: STOP_AT,
    volume: 0,
  }); // prettier-ignore

  queue.addFrame(0, () => {
    switchCamera('universal-camera');
    positionCamera({ x: -2, y: 1, z: -10 });
    animateGround('g1', { toPosition: { x: -40, y: 0, z: 40 } });
    animateMesh('car', 10, { positionDelta: { x: 10, z: -40 }, isLinear: true });
  });

  queue.addFrame(5268, () => {
    positionCamera({ x: -2, y: 1, z: -10 }, { x: 3, y: -173, z: 0 });
  });

  queue.addFrame(7900, () => {
    showGround('g1', false);
    positionCamera({ x: 63, y: 8, z: -4.6 }, { x: 3, y: -84, z: 0 });
    moveMesh(car, { positionDelta: { z: 40 } });
    animateMesh(car, 2, { positionDelta: { z: -40 }, isLinear: true });
  });

  queue.addFrame(12000, () => {
    moveMesh(car, { position: { x: 0, y: 0, z: 20 } });
    animateMesh(car, 2, { positionDelta: { z: -20 }, isLinear: true });
    showGround('g1', true);
    switchCamera('arc-camera');
    arcCamera({ alpha: 3.21, beta: 1.48, radius: 21 });
    animateCamera({
      alpha: 3.14,
      radius: 12,
      speed: 1,
    });
  });

  queue.addFrame(18800, () => {
    showGround('g1', false);
    showGround('g2', true);
    animateGround('g2', {
      toPosition: { x: -40, y: 0, z: 40 },
    });
    playAmbience('flyby', 'http://localhost:3001/sounds/modelz/flyby.mp3', {
      startTime: 1.1,
    });
  });

  queue.addFrame(20500, () => {
    animateCamera({
      alpha: 2 * 3.14,
    });
  });

  queue.addFrame(21800, () => {
    showGround('g2', false);
    showGround('g3', true);
    animateGround('g3', {
      toPosition: { x: -40, y: 0, z: 40 },
    });
    animateMesh(car, 2, { positionDelta: { z: -40 } });
  });

  queue.addFrame(23800, () => {
    switchCamera('universal-camera');
    positionCamera({ x: 15, y: -2.16, z: 43 }, { x: 7.22, y: 187, z: 0 });
    // changeSkyBox('http://localhost:3001/scenes/m3');
    // showGround('g3', false);
  });

  queue.addFrame(25800, () => {
    switchCamera('arc-camera');
    showGround('g3', false);
    moveMesh(car, { position: { x: 0, y: 0, z: 0 } });
    arcCamera({ alpha: 1.8, beta: 1.48, radius: 21 });
    animateCamera({
      alpha: 3.14 / 2,
      radius: 12,
      beta: 3.14 / 2,
      speed: 4,
    });

    // invokeEvent('startHud', { show: true });

    // changeSkyBox('http://localhost:3001/scenes/sf5');
    // showGround('g3', false);
    // animateMesh(car, 2, { positionDelta: { z: -40 }, isLinear: true });
  });

  queue.addFrame(28800, () => {
    animateCamera({
      alpha: -3.14 / 4,
      radius: 12,
      beta: 3.14 / 4,
      speed: 4,
    });

    // changeSkyBox('http://localhost:3001/scenes/sf5');
    // showGround('g3', false);
    // animateMesh(car, 2, { positionDelta: { z: -40 }, isLinear: true });
  });

  queue.addFrame(31800, () => {
    animateCamera({
      alpha: 3.14,
      radius: 12,
      beta: 0,
      speed: 4,
    });

    // changeSkyBox('http://localhost:3001/scenes/sf5');
    // showGround('g3', false);
    // animateMesh(car, 2, { positionDelta: { z: -40 }, isLinear: true });
  });

  queue.addFrame(38800, () => {
    switchCamera('universal-camera');
    changeBackground('http://localhost:3001/scenes/s2.png');
    positionCamera({ x: 0, y: 0, z: 0 }, { x: 0, y: 90, z: 0 });
    showGround('g3', false);

    moveMesh(car, {
      position: { x: 30, y: 0, z: 15 },
      rotation: { x: -90, y: 0, z: 40 },
    });

    // animateMesh(car, 4, {
    //   position: { x: 15, y: -8, z: -20 },
    //   rotation: { x: -90, y: 0, z: 15 },
    //   isLinear: true,
    // });

    addSkyPlane('http://localhost:3001/scenes/sf6_nx.png');
  });

  queue.addFrame(39800, () => {
    // animateMesh(car, 2, { positionDelta: { z: -20, x: 40 }, isLinear: true });
    //   invokeEvent('startHud', { show: true });
    //   addSkyPlane('http://localhost:3001/scenes/sf6_nx.png');
    // animateMesh(car, 4, {
    //   position: { x: 19, y: -18, z: -60 },
    //   rotation: { x: -90, y: 0, z: -25 },
    //   isLinear: true,
    // });
    animateCamera({
      position: { x: 20, y: 0, z: 0 },
      speed: 1,
      isLinear: true,
    });
  });

  // queue.addFrame(33800, () => {
  //   switchCamera('universal-camera');
  //   changeSkyBox('http://localhost:3001/scenes/sf6');
  // });

  yield delay(10000);

  let index = 0;
}

type ActionSpeech = {
  type: 'BABYLON_LOADED';
  scene: any;
  debugBabylon?: boolean;
};

export function* sceneLoaded(action: ActionSpeech) {
  yield delay(1000);

  scene = action.scene;

  scene.setActiveCameraById(scene.cameras[0].id);
  scene.activeCamera.attachControl(scene.getEngine().getRenderingCanvas());

  initSkyBox('http://localhost:3001/scenes/b');

  yield call(startAnimation);
}

type ActionPlay = {
  type: 'PLAY';
};

export function* wrapUp() {
  // yield call(stopAmbience, 'modelz');

  yield put(
    actions.appState.patch({
      flavour: 'default',
    })
  );

  yield put(
    actions.playback.patch({
      playbackStatus: 'idle',
      startTime: Date.now(),
    })
  );
}

export function* play(action: ActionPlay) {
  toast.show('Starting playback');

  yield put(
    actions.appState.patch({
      flavour: 'outcome',
    })
  );

  yield put(
    actions.playback.patch({
      playbackStatus: 'playing',
      startTime: Date.now(),
    })
  );
}

export function* start() {
  task = yield* fork(startAnimation);
}

export function* stop() {
  stopAudio();
  yield* cancel(task as any);
  yield fork(wrapUp);
}

export function* root() {
  yield takeEvery('SIXTY_LOADED', sceneLoaded);
  yield takeLatest('PLAY', start);
  yield takeLatest('PLAY', play);
  yield takeEvery('STOP', stop);
}

const changeBackground = (url: string) => {};
