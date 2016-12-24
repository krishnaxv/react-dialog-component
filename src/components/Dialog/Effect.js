import { spring, presets } from 'react-motion';

const EffectConfig = {
  FADE_IN: {
    start: {
      from: {
        opacity: 0
      },
      to: {
        opacity: spring(1, presets.noWobble)
      }
    },
    end: {
      from: {
        opacity: 1
      },
      to: {
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  FADE_IN_SCALE: {
    start: {
      from: {
        scale: 0.5,
        opacity: 0.5
      },
      to: {
        scale: spring(1, presets.noWobble),
        opacity: spring(1, presets.noWobble)
      }
    },
    end: {
      from: {
        scale: 1,
        opacity: 1
      },
      to: {
        scale: spring(0, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  FALL: {
    start: {
      from: {
        scale: 1.5,
        opacity: 0
      },
      to: {
        scale: spring(1, presets.noWobble),
        opacity: spring(1, presets.noWobble)
      }
    },
    end: {
      from: {
        scale: 1,
        opacity: 1
      },
      to: {
        scale: spring(1.5, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  SIDE_FALL: {
    start: {
      from: {
        translate: 60,
        translateZ: 300,
        rotate: 45,
        opacity: 0
      },
      to: {
        translate: spring(0, presets.wobbly),
        translateZ: spring(0, presets.wobbly),
        rotate: spring(0, presets.wobbly),
        opacity: spring(1, presets.wobbly)
      }
    },
    end: {
      from: {
        translate: 0,
        translateZ: 0,
        rotate: 0,
        opacity: 1
      },
      to: {
        translate: spring(60, presets.noWobble),
        translateZ: spring(300, presets.noWobble),
        rotate: spring(45, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  SLIDE_IN_TOP: {
    start: {
      from: {
        translateY: -40,
        opacity: 0
      },
      to: {
        translateY: spring(0, presets.wobbly),
        opacity: spring(1, presets.wobbly)
      }
    },
    end: {
      from: {
        translateY: 0,
        opacity: 1
      },
      to: {
        translateY: spring(-40, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  SLIDE_IN_RIGHT: {
    start: {
      from: {
        translateX: 40,
        opacity: 0
      },
      to: {
        translateX: spring(0, presets.wobbly),
        opacity: spring(1, presets.wobbly)
      }
    },
    end: {
      from: {
        translateX: 0,
        opacity: 1
      },
      to: {
        translateX: spring(40, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  SLIDE_IN_BOTTOM: {
    start: {
      from: {
        translateY: 40,
        opacity: 0
      },
      to: {
        translateY: spring(0, presets.wobbly),
        opacity: spring(1, presets.wobbly)
      }
    },
    end: {
      from: {
        translateY: 0,
        opacity: 1
      },
      to: {
        translateY: spring(40, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  SLIDE_IN_LEFT: {
    start: {
      from: {
        translateX: -40,
        opacity: 0
      },
      to: {
        translateX: spring(0, presets.wobbly),
        opacity: spring(1, presets.wobbly)
      }
    },
    end: {
      from: {
        translateX: 0,
        opacity: 1
      },
      to: {
        translateX: spring(-40, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  },
  ROTATE_IN: {
    start: {
      from: {
        rotate: 180,
        opacity: 0
      },
      to: {
        rotate: spring(0, presets.wobbly),
        opacity: spring(1, presets.wobbly)
      }
    },
    end: {
      from: {
        rotate: 0,
        opacity: 1
      },
      to: {
        rotate: spring(180, presets.noWobble),
        opacity: spring(0, presets.noWobble)
      }
    }
  }
};

const fadeIn = value => (
  {
    opacity: value.opacity
  }
);

const fadeInScale = value => (
  {
    transform: `scale(${value.scale})`,
    opacity: value.opacity
  }
);

const fall = value => (
  {
    transform: `scale(${value.scale})`,
    opacity: value.opacity
  }
);

const sideFall = value => (
  {
    transformStyle: 'preserve-3d',
    transform: `translate(${value.translate}%) translateZ(${value.translateZ}px) rotate(${value.rotate}deg)`,
    opacity: value.opacity
  }
);

const slideInTop = value => (
  {
    transform: `translateY(${value.translateY}px)`,
    opacity: value.opacity
  }
);

const slideInRight = value => (
  {
    transform: `translateX(${value.translateX}px)`,
    opacity: value.opacity
  }
);

const slideInBottom = value => (
  {
    transform: `translateY(${value.translateY}px)`,
    opacity: value.opacity
  }
);

const slideInLeft = value => (
  {
    transform: `translateX(${value.translateX}px)`,
    opacity: value.opacity
  }
);

const rotateIn = value => (
  {
    transform: `rotate(${value.rotate}deg)`,
    opacity: value.opacity
  }
);

const Effect = {
  FADE_IN: fadeIn,
  FADE_IN_SCALE: fadeInScale,
  FALL: fall,
  SIDE_FALL: sideFall,
  SLIDE_IN_TOP: slideInTop,
  SLIDE_IN_RIGHT: slideInRight,
  SLIDE_IN_BOTTOM: slideInBottom,
  SLIDE_IN_LEFT: slideInLeft,
  ROTATE_IN: rotateIn
};

export default Effect;
export { EffectConfig };
