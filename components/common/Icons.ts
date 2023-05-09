import dynamic from 'next/dynamic';

const Ax = dynamic(() => import('@/public/icons/ax.svg'));
const Bell = dynamic(() => import('@/public/icons/bell.svg'));
const Bubble = dynamic(() => import('@/public/icons/bubble.svg'));
const Check = dynamic(() => import('@/public/icons/check.svg'));
const Clock = dynamic(() => import('@/public/icons/clock.svg'));
const CompactDown = dynamic(() => import('@/public/icons/compactdown.svg'));
const Darkmode = dynamic(() => import('@/public/icons/darkmode.svg'));
const Dice = dynamic(() => import('@/public/icons/dice.svg'));
const ExceptButton = dynamic(() => import('@/public/icons/exceptbutton.svg'));
const Google = dynamic(() => import('@/public/icons/google.svg'));
const Kakao = dynamic(() => import('@/public/icons/kakao.svg'));
const Lightmode = dynamic(() => import('@/public/icons/lightmode.svg'));
const Logo = dynamic(() => import('@/public/icons/logo.svg'));
const Naver = dynamic(() => import('@/public/icons/naver.svg'));
const O = dynamic(() => import('@/public/icons/o.svg'));
const Ox = dynamic(() => import('@/public/icons/ox.svg'));
const Play = dynamic(() => import('@/public/icons/play.svg'));
const Selected = dynamic(() => import('@/public/icons/select.svg'));
const Triangle = dynamic(() => import('@/public/icons/triangle.svg'));
const VerticalDot = dynamic(() => import('@/public/icons/verticaldot.svg'));
const Zoomin = dynamic(() => import('@/public/icons/zoomin.svg'));

const Icons = {
  Lightmode,
  Darkmode,
  Bell,
  Bubble,
  Dice,
  Ox,
  Check,
  ExceptButton,
  VerticalDot,
  Zoomin,
  O,
  Ax,
  Triangle,
  Naver,
  Kakao,
  Google,
  Clock,
  Play,
  CompactDown,
  Selected,
  Logo,
};

export default Icons;
export type IconType = keyof typeof Icons;
