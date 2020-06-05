import React from 'react';
import { Heading, Box } from '@chakra-ui/core';

function DirectConsent() {
  return (
    <Box>
      <Box textAlign="center" mb={4}>
        <Heading as="h2" size="lg" my={4}>
          “VERİ SAHİBİNİN AÇIK RIZA BEYAN FORMU”
        </Heading>
      </Box>
      <p>
        İşbu Bilgilendirme Yazısını okuduğumu ve 6698 sayılı Kişisel Verilerin
        Korunması Kanun kapsamında, kişisel verilerinin PROJE tarafından
        yasadaki esaslar çerçevesinde toplanmasına, kaydedilmesine, işlenmesine
        saklanmasına peşinen izin verdiğimi kabul, beyan ve taahhüt ederim.
      </p>
      <p>
        6698 sayılı “Kişisel Verilerin Korunması Kanunu” gereğince, kişisel
        verilerimin PROJE tarafından işlenmesine ilişkin PROJE’ ye tarafımca
        elektronik ortamda verilen kimliğimi belirleyen veya belirlemeye
        yarayanlar da dahil olmak üzere her türlü kişisel verimin PROJE
        tarafından işlenmesine muvafakat ettiğimi kabul, beyan ve taahhüt
        ederim.
      </p>
      <ul>
        <li>
          Kimliği belirli veya belirlenebilir bir gerçek kişiye ait olduğu açık
          olan; kısmen veya tamamen otomatik şekilde veya veri kayıt sisteminin
          bir parçası olarak otomatik olmayan şekilde işlenen; kişinin kimliğine
          dair bilgilerin bulunduğu verilerdir; ad-soyad, T.C.Kimlik numarası,
          uyruk bilgisi, anne adı-baba adı, doğum yeri, doğum tarihi, cinsiyet
          gibi bilgileri içeren bilgiler
        </li>
        <li>
          Kimliği belirli veya belirlenebilir bir gerçek kişiye ait olduğu açık
          olan; kısmen veya tamamen otomatik şekilde veya veri kayıt sisteminin
          bir parçası olarak otomatik olmayan şekilde işlenen; telefon numarası,
          adres, e-mail adresi, IP adresi gibi bilgiler, kişisel veri içeren
          belgelerin kopyası niteliğindeki belgelerde yer alan veriler
          (e-Devletten onaylanabilen öğrenci belgesi)
        </li>
        <li>
          Kimliği belirli veya belirlenebilir bir gerçek kişiye ait olduğu açık
          olan; kısmen veya tamamen otomatik şekilde veya veri kayıt sisteminin
          bir parçası olarak otomatik olmayan şekilde işlenen; Kişisel Verilerin
          Korunması Kanunu’nun 6. maddesinde belirtilen veriler Kimliği belirli
          veya belirlenebilir bir gerçek kişiye ait olduğu açık olan; kısmen
          veya tamamen otomatik şekilde veya veri kayıt sisteminin bir parçası
          olarak otomatik olmayan şekilde işlenen; PROJE’ ye yöneltilmiş olan
          her türlü talep veya şikayetin alınması ve değerlendirilmesine ilişkin
          kişisel veriler PROJE Kişisel Verilerin Korunması ve İşlenmesi
          Hakkında web sitesinde bulunan AYDINLATMA METNİNİ ve haklarımı okudum
          ve kabul ediyorum.
        </li>
      </ul>
    </Box>
  );
}

export default DirectConsent;
