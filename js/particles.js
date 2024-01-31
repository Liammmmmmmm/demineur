tsParticles.load("tsparticles", {
    fpsLimit: 60,
    backgroundMode: {
      enable: true,
      zIndex: 1000000 
    },
  
    particles: {
        number: {
            value: 0,
            density: {
                enable: true,
                area: 800 
            } 
        },

        life: {
            count: 1
        },

  
        color: {
            value: [
                "#a7db52",
                "#98d537",
                "#9ad737",
                "#a5f525"
            ] 
        },
  
  
        destroy: {
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: 9,
                    random: {
                        enable: true,
                        minimumValue: 4 
                    } 
                },
                rate: {
                    value: 10,
                    random: {
                        enable: true,
                        minimumValue: 5 
                    } 
                },
                particles: {
                    collisions: {
                        enable: true 
                    },
                    destroy: {
                        mode: "none" 
                    },  
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 1,
                                max: 2
                            }
                        }
                    },
                } 
            } 
        },
        shape: {
            type: "square",
            stroke: {
                width: 0,
                color: "#000000" 
            },
            polygon: {
                sides: 5 
            },
            image: {
                src: "https://cdn.matteobruni.it/images/particles/github.svg",
                width: 100,
                height: 100
            } 
        },
        opacity: {
            value: 1,
            random: false,
            animation: {
                enable: false,
                speed: 1,
                minimumValue: 0.1,
                sync: false 
            } 
        },
        size: {
            value: 15,
            random: {
                enable: true,
                minimumValue: 10 
            },
    
            animation: {
                enable: false,
                speed: 40,
                minimumValue: 0.1,
                sync: false 
            } 
        },
        lineLinked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1 
        },
        collisions: {
            enable: true,
            mode: "destroy" 
        },
        move: {
            enable: true,
            gravity: {
              enable: true,
              acceleration: 9.81,
              inverse: false
            },
            decay: 0.1,
            speed: {
                min: 5,
                max: 10
            },
            direction: "outside",
            outModes: "destroy"
        } 
    },
    interactivity: {
        detectsOn: "window",
        events: {
            onClick: {
                enable: true,
                mode: "push" 
            },
            resize: true 
        },
  
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1 
                } 
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8 
            },
            repulse: {
                distance: 200 
            },
            push: {
                particles_nb: 1 
            },
            remove: {
                particles_nb: 2 
            } 
        } 
    },
    detectRetina: true 
});