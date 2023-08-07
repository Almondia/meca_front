/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FlexCenter, FlexSpaceBetween } from '@/styles/layout';

export const ImageCropperWrapper = styled.div<{ roundness: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: black;

  .cropper-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    touch-action: none;
    user-select: none;
    & img {
      backface-visibility: hidden;
      display: block;
      width: 100%;
      height: 100%;
      image-orientation: 0deg;
      max-height: none !important;
      max-width: none !important;
      min-height: 0 !important;
      min-width: 0 !important;
    }
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-crop-box .cropper-drag-box,
  .cropper-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .cropper-wrap-box,
  .cropper-canvas {
    overflow: hidden;
  }

  .cropper-drag-box {
    background-color: #fff;
    opacity: 0;
  }

  .cropper-modal {
    background-color: #000;
    opacity: 0.5;
  }

  .cropper-view-box {
    display: block;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
    overflow: hidden;
    width: 100%;
  }

  .cropper-crop-box,
  .cropper-view-box {
    border-radius: ${(props) => props.roundness};
  }

  .cropper-dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: 0.5;
    position: absolute;

    &.dashed-h {
      border-bottom-width: 1px;
      border-top-width: 1px;
      height: calc(100% / 3);
      left: 0;
      top: calc(100% / 3);
      width: 100%;
    }

    &.dashed-v {
      border-left-width: 1px;
      border-right-width: 1px;
      height: 100%;
      left: calc(100% / 3);
      top: 0;
      width: calc(100% / 3);
    }
  }

  .cropper-center {
    display: block;
    height: 0;
    left: 50%;
    opacity: 0.75;
    position: absolute;
    top: 50%;
    width: 0;

    &::before,
    &::after {
      background-color: #eee;
      content: ' ';
      display: block;
      position: absolute;
    }

    &::before {
      height: 1px;
      left: -3px;
      top: 0;
      width: 7px;
    }

    &::after {
      height: 7px;
      left: 0;
      top: -3px;
      width: 1px;
    }
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    display: block;
    height: 100%;
    opacity: 0.1;
    position: absolute;
    width: 100%;
  }

  .cropper-face {
    background-color: #fff;
    left: 0;
    top: 0;
  }

  .cropper-line {
    background-color: #39f;

    &.line-e {
      cursor: ew-resize;
      right: -3px;
      top: 0;
      width: 5px;
    }

    &.line-n {
      cursor: ns-resize;
      height: 5px;
      left: 0;
      top: -3px;
    }

    &.line-w {
      cursor: ew-resize;
      left: -3px;
      top: 0;
      width: 5px;
    }

    &.line-s {
      bottom: -3px;
      cursor: ns-resize;
      height: 5px;
      left: 0;
    }
  }

  .cropper-point {
    background-color: #39f;
    height: 5px;
    opacity: 0.75;
    width: 5px;

    &.point-e {
      cursor: ew-resize;
      margin-top: -3px;
      right: -3px;
      top: 50%;
    }

    &.point-n {
      cursor: ns-resize;
      left: 50%;
      margin-left: -3px;
      top: -3px;
    }

    &.point-w {
      cursor: ew-resize;
      left: -3px;
      margin-top: -3px;
      top: 50%;
    }

    &.point-s {
      bottom: -3px;
      cursor: s-resize;
      left: 50%;
      margin-left: -3px;
    }

    &.point-ne {
      cursor: nesw-resize;
      right: -3px;
      top: -3px;
    }

    &.point-nw {
      cursor: nwse-resize;
      left: -3px;
      top: -3px;
    }

    &.point-sw {
      bottom: -3px;
      cursor: nesw-resize;
      left: -3px;
    }

    &.point-se {
      bottom: -3px;
      cursor: nwse-resize;
      opacity: 1;
      right: -3px;
    }

    &.point-se::before {
      background-color: #39f;
      bottom: -50%;
      content: ' ';
      display: block;
      height: 200%;
      opacity: 0;
      position: absolute;
      right: -50%;
      width: 200%;
    }
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-color: white;
  }

  .cropper-hide {
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

  & > div {
    ${FlexSpaceBetween};
    flex-direction: column;
    max-width: 1440px;
    width: 100%;
    height: 100%;
    margin: auto;
    & > *:nth-child(2) {
      width: 100%;
      height: 100%;
      max-height: 70vh;
    }
  }
`;

export const CropPreviewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  ${FlexCenter};
  margin: auto;
  width: 100%;
  max-height: 70vh;
  content: '';
`;

export const CropSideContainer = styled.div`
  ${FlexSpaceBetween};
  padding: 20px;
  @media ${({ theme }) => theme.media.mobile} {
    padding: 12px;
  }
  button {
    border-radius: 20px;
  }
  & > * {
    ${FlexSpaceBetween};
    column-gap: 16px;
    transform: scale(0.9);
  }
`;
