import { css } from 'lit';

export const sharedStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: none;
    opacity: 0;
    z-index: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  :host([active]) .slide {
    display: flex;
    opacity: 1;
    z-index: 50;
    pointer-events: auto;
  }

  .glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1.5rem;
  }

  .text-gradient-blue {
    background: linear-gradient(135deg, #116bc6, #ecf4fd);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-gradient-green {
    background: linear-gradient(135deg, #0b8512, #ecf4fd);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-gradient-red {
    background: linear-gradient(135deg, #8c0c16, #ecf4fd);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
