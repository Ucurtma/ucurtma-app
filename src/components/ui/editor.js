import React from 'react';
import EditorJS from '@editorjs/editorjs';
import EditorHeader from '@editorjs/header';
import EditorDelimiter from '@editorjs/delimiter';
import EditorList from '@editorjs/list';
import EditorImage from '@editorjs/image';
import EditorEmbed from '@editorjs/embed';
import { useTranslation } from 'react-i18next';
import { Box } from '@chakra-ui/core';

function Editor({ ...otherProps }) {
  const { t } = useTranslation('editor');

  React.useEffect(() => {
    window.editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: EditorHeader,
        delimiter: EditorDelimiter,
        list: EditorList,
        image: EditorImage,
        embed: EditorEmbed,
      },
      data: {
        time: 1591790666767,
        blocks: [
          {
            type: 'embed',
            data: {
              service: 'youtube',
              source:
                'https://www.youtube.com/watch?v=mZyVwWG30Jo&amp;feature=emb_title',
              embed: 'https://www.youtube.com/embed/mZyVwWG30Jo?',
              width: 580,
              height: 320,
              caption: '',
            },
          },
          {
            type: 'header',
            data: {
              text: 'Merhaba, ben Barış Bayraktar.',
              level: 5,
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'Bir devlet lisesi olan ECA Elginkan Anadolu Lisesi’nden mezun oldum ve bu sırada kendi imkanlarımla olabildiğince yoğun bir şekilde 11. sınıftan itibaren Türk müfredatı dışında yurtdışı için SAT müfredatı ve yanında TOEFL çalışmaya başladım.',
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'Bir yandan da okulumda ve okul dışında ders dışı aktivitelere çok önem vermeye başladım. Bundan dolayı hem okulumda hem de okulum dışında birçok etkinliğe katıldım ve düzenledim, okulumun ilk bilim kulübünü kurdum ve yönettim.',
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'Okulda 10. sınıfta kendim mini bir konferans vermiştim bunun haricinde Umut Yıldız hocamla bir e-konferans düzenlemiştim ve bu okulumda bir ilkti. Sonrasında ise bu yaptığım iki etkinlik okulumda ECA Astronomi adını verdiğim bilim kulübünün kurulmasına kadar gitti. ECA Astronomi yine benim yönetimimde değerli hocalarımızla konferanslar düzenlemek haricinde farklı bir konsept olarak “ECA Astronomi Günleri” adında öğrencilerin mini konferans tarzı konuşmalar yaptığı bir etkinlik düzenledi (ECA Astronomi, kurulduğu yıldan itibaren okulun en aktif kulübü oldu).',
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'Okul dışında ise Future Science Team, Gelecek Bilimde gibi oluşumlarda üst mevkilerde yer alarak hem deneyim kazanarak kendimi geliştirdim ve geliştiriyorum hem de bilimin güzelliğinin insanlara ulaşmasına katkıda bulunuyorum. Aynı zamanda Bilim Treni adındaki bir bilim sitesinde yöneticilik yapmakla birlikte Bilim Treni için birkaç tane makale tarzında yazı yazdım ve çevirdim, bunlar da İngilizce dil öğrenimime büyük katkıda bulundu. Bir yandan kendi imkanlarım dahilinde gerçekleştirebildiğim bu faaliyetler ve SAT, TOEFL notlarım, okul yıl sonu ortalamam ile üniversitelere başvurdum ve astronomi alanında dünyanın en iyi üniversitelerinden biri olan Pennsylvania State University’den kabul aldım.',
            },
          },
          {
            type: 'image',
            data: {
              file: {
                url:
                  'https://s3.eu-west-2.amazonaws.com/prod.cdn.ucurtmaprojesi.com/baris-bayraktar/university-1.png',
              },
              caption: '',
              withBorder: false,
              stretched: false,
              withBackground: false,
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                '<a target="_blank" href="http://personal.psu.edu/nnp/dptrank.html#:~:text=Executive%20summary%3A%20Penn%20State%20Astronomy,S%2BR">Kaynak</a>',
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'İleri Okuma:&nbsp;<a target="_blank" href="https://science.psu.edu/about/facts/rankings">Science Rankings | Eberly College of Science</a>',
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'Şu an üniversiteye kayıt olmuş bulunmaktayım çünkü uzun uğraşlarım sonucunda 330 dolar olan kayıt ücretini almamayı kabul ettiler. Ancak hâlâ bir miktar bursa ihtiyacım bulunmakta çünkü yabancı öğrenci olduğum için ve üniversite yabancı lisans öğrencilerine burs vermediğinden dolayı üniversiteden ilk sene için bir burs alamadım. <b>İhtiyacım olan miktar olan 38,000 dolara ilişkin detaylar aşağıdadır.</b>',
            },
          },
          {
            type: 'image',
            data: {
              file: {
                url:
                  'https://s3.eu-west-2.amazonaws.com/prod.cdn.ucurtmaprojesi.com/baris-bayraktar/required-support.png',
              },
              caption: '',
              withBorder: false,
              stretched: false,
              withBackground: false,
            },
          },
          {
            type: 'image',
            data: {
              file: {
                url:
                  'https://s3.eu-west-2.amazonaws.com/prod.cdn.ucurtmaprojesi.com/baris-bayraktar/required-support-2.png',
              },
              caption: '',
              withBorder: false,
              stretched: false,
              withBackground: false,
            },
          },
          {
            type: 'paragraph',
            data: {
              text:
                'Zaman ayırdığınız için teşekkür ederim. :) Yardımlarınız benim için çok değerli.',
            },
          },
          {
            type: 'paragraph',
            data: {
              text: 'Saygılarımla.',
            },
          },
        ],
        version: '2.17.0',
      },
    });

    return () => {
      window.editor.destroy();
    };
  }, [t]);

  return <Box {...otherProps} id="editorjs" />;
}

export default Editor;

// data: {
//   time: 1590507482120,
//   blocks: [
//     {
//       type: 'header',
//       data: { text: t('welcome'), level: 2 },
//     },
//     {
//       type: 'paragraph',
//       data: { text: t('description') },
//     },
//     {
//       type: 'header',
//       data: { text: t('createList'), level: 3 },
//     },
//     {
//       type: 'list',
//       data: {
//         style: 'unordered',
//         items: [
//           t('list.polarBears'),
//           t('list.beeEyes'),
//           t('list.catTaste'),
//         ],
//       },
//     },
//     {
//       type: 'header',
//       data: { text: t('addImages'), level: 3 },
//     },
//     {
//       type: 'image',
//       data: {
//         file: {
//           url:
//             'https://live.staticflickr.com/5824/21232621921_004b69900d_b.jpg',
//         },
//         caption: t('imageCaption'),
//         withBorder: false,
//         stretched: false,
//         withBackground: false,
//       },
//     },
//   ],
//   version: '2.17.0',
// },
