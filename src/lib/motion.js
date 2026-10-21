export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeOutQuart = [0.25, 1, 0.5, 1];

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOutExpo
    }
  }
};

export const fadeIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easeOutExpo
    }
  }
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
