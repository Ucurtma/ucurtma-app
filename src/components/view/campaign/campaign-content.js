import React, { Suspense, lazy } from 'react';
import { Flex, Box, Heading } from '@chakra-ui/core';
import Documents from './documents';
import Goals from './goals';
import Loader from '../../ui/loader';
import EditorRenderer from '../../ui/editor-renderer';

const CampaignTarget = lazy(() => import('./campaign-target'));
const Timeline = lazy(() => import('../../ui/timeline'));

const dataBlock = {
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
        withBorder: true,
        stretched: false,
        withBackground: false,
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          '<a href="http://personal.psu.edu/nnp/dptrank.html#:~:text=Executive%20summary%3A%20Penn%20State%20Astronomy,S%2BR">Kaynak</a>',
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
};

function CampaignContent({ data }) {
  return (
    <Flex flexDir={{ base: 'column', lg: 'row' }}>
      <Box
        w="full"
        flexShrink="0"
        maxW={{ base: '100%', lg: '65%' }}
        fontSize="15px"
        fontWeight={500}
      >
        {/* <ReactMarkdown
          renderers={{
            ...ChakraUIRenderer(),
            paragraph: props => {
              const { children } = props;
              return <Text mb={4}>{children}</Text>;
            },
            link: props => {
              const { children, href } = props;
              return (
                <Link color="blue.500" href={href} isExternal>
                  {children}
                </Link>
              );
            },
          }}
          source={data.campaign?.campaignText}
          escapeHtml={false}
        /> */}
        <EditorRenderer blocks={dataBlock} />
        {data.campaign?.documents && (
          <Box>
            <Documents documents={data.campaign?.documents} />
          </Box>
        )}
        {data.campaign?.goals && (
          <Box mt={5}>
            <Goals goals={data.campaign?.goals} />
          </Box>
        )}
      </Box>
      <Box w="full" height="full">
        {data.campaign?.campaignTarget && (
          <Box
            bg="gray.50"
            borderRadius="4px"
            p={4}
            maxW={{ base: '100%' }}
            ml={{ base: 0, lg: 8 }}
            mt={{ base: 4, lg: 0 }}
            mb={8}
          >
            <Suspense fallback={<Loader />}>
              <CampaignTarget
                target={data.campaign?.campaignTarget}
                current={parseFloat(data.campaign?.totalFunds)}
              />
            </Suspense>
          </Box>
        )}

        {data.campaign?.updates.length > 0 && (
          <Box
            bg="gray.50"
            borderRadius="4px"
            p={4}
            maxW={{ base: '100%' }}
            ml={{ base: 0, lg: 8 }}
            mt={{ base: 4, lg: 0 }}
          >
            <Heading size="sm" color="gray.500">
              Kampanya Gelişmeleri
            </Heading>
            <Suspense fallback={<Loader />}>
              <Timeline
                items={data.campaign?.updates}
                transactions={data.campaign?.transactions}
              />
            </Suspense>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default CampaignContent;
