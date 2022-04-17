module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greenBaby:"#3DB46D"
      },
      keyframes:{
        fadeInAnimation:{
          '0%':{
            opacity:0,
            transform:'translate(0,500px)',
          },
          '100%':{
            opacity:1,
            transform:'translate(0)'
          },
        },
        fadeInAnimationToo:{
            '0%':{
              opacity:0,
            },
            '100%':{
              opacity:1,
            }
          },
        moveBar:{
          '0%':{
            'margin-left':'-100%'
          },
          '100%':{
            'margin-left':'100%'
          }
        }  
      },
      animation:{
        fadeCat:'fadeInAnimation 2s ease 1',
        fadeKitten:'fadeInAnimationToo 1s ease 1',
        fadePussy:'fadeInAnimation 1s ease 1',
        slider:'moveBar 1.5s linear infinite'
      }
    },
  },
  plugins: [],
}
