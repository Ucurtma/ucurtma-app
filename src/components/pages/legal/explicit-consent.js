import React from 'react';
import { Heading, Box } from '@chakra-ui/react';

function ExplicitConsent() {
  return (
    <Box>
      <Box textAlign="center">
        <Heading as="h3" size="md" my={4}>
          TİCARİ ELEKTRONİK İLETİ GÖNDERİLMESİNE İLİŞKİN AÇIK RIZA METNİ
        </Heading>
      </Box>
      <p>
        Açık rızanız kapsamında, (tam unvan) Şirketi (“Uçurtma Projesi”) olarak
        sunduğumuz hizmetlerin süreçlerinin yürütülmesi ve en yüksek faydayı
        elde etmeniz için planlamalar yapılması, hizmetlerimize yönelik
        bilgilendirmelerin tarafınıza sunulması, tanıtım ve reklam
        faaliyetlerinin yürütülmesi gibi amaçlarla kişisel verilerinizi
        işleyebilmekteyiz.
      </p>
      <p>
        Kişisel verilerinizi, yukarıdaki amaçlar dahilinde, yurtiçinde veya
        yurtdışındaki hizmet aldığımız tedarikçilerimiz ve iş ortaklarımızla
        paylaşabilmekteyiz.
      </p>
      <Box textAlign="center">
        <Heading as="h3" size="md" my={4}>
          TİCARİ ELEKTRONİK İLETİ ONAYI
        </Heading>
      </Box>
      <p>
        İşbu metin, 6563 Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve
        Ticari İletişim Ve Ticari Elektronik İletiler Hakkında Yönetmelik
        kapsamında (tam unvan) (“Uçurtma Projesi”) tarafından sunulan ürün ve
        hizmetlerin hakkında genel/özel imkanların duyurulmasına, güncel
        gelişmelerden haberdar edilmesine, kutlama amaçlı iletiler
        gönderilmesine, sunum ve bülten gibi içeriklerin paylaşılmasına, tanıtım
        ve reklamının yapılması için tarafıma ilgili kanunlara uygun olarak
        ticari elektronik ileti ve diğer iletiler gönderilmesine, bilgilerimin
        mal / hizmet satış ve reklam / kampanya / promosyon süreçlerinin
        yürütülmesi adına bu amaçlar ile alındığına ve tercih ettiğim kanalla
        tarafıma iletiler gönderileceğine, her zaman iletişim tercihlerimi
        değiştirebileceğime veya hiçbir gerekçe göstermeksizin tarafıma gelen
        iletilerde belirtilen işlemi reddederek iletişimi durdurabileceğime ve
        kanunlara uygun şekilde SMS/kısa mesaj, otomatik arama, telefonla arama,
        sosyal medya ile çevrimiçi reklam ağları, e-posta/mail ve diğer
        elektronik iletişim araçları-kanalları yoluyla tarafıma ticari
        elektronik iletiler ve diğer iletiler gönderilmesine ilişkin onayımı
        içermektedir.
      </p>
      <p>
        Tarafıma gönderilecek ticari elektronik iletilere ilişkin yukarıdaki
        Aydınlatma ve Açık Rıza Metni’ni ve Ticari Elektronik İleti Onayı
        Metni’ni okuduğumu ve anladığımı kabul ve beyan ediyorum. Bu kapsamda
        aşağıda tercih ettiğim kanallarla tarafıma ticari elektronik ileti
        gönderilmesine açık rıza ve onay veriyorum.
      </p>
    </Box>
  );
}

export default ExplicitConsent;
