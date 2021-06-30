import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LandingBiLiraFlow from './landing-bilira-flow';
import PaymentMethodViewer from './payment-method-viewer';
import PaymentMethods from './payment-methods';

function LandingPayment() {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState();
  const selectedMethodBox = useRef();

  useEffect(() => {
    if (location.state?.redirectedFromAuth) {
      setSelectedMethod({ slug: 'para-transferi' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box id="landing-payment">
        <PaymentMethods
          activeMethod={selectedMethod}
          onSelect={method => {
            setSelectedMethod(method);
            if (selectedMethodBox.current) {
              selectedMethodBox.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          }}
        />
      </Box>
      {selectedMethod && (
        <Box
          mt={2}
          px={5}
          py={6}
          boxShadow="0px 0px 13px rgba(196, 196, 196, 0.45)"
          ref={selectedMethodBox}
        >
          {selectedMethod.slug === 'bilira' && (
            <PaymentMethodViewer
              alert={{
                title: 'Bu cüzdan sadece BiLira tokenı kabul etmektedir.',
                desc:
                  'Bu kontrata göndereceğiniz diğer tokenları geri döndürülemez biçimde kaybedersiniz.',
              }}
              value="0x955E5F56fae77Db5829FAE980ADeAc688fE80259"
            />
          )}
          {selectedMethod.slug === 'ethereum' && (
            <PaymentMethodViewer
              alert={{
                title:
                  'Bu cüzdana ERC20 kökenli bütün tokenlar ile ödeme yapabilirsiniz.',
                status: 'success',
              }}
              value="0xaEf4bB2D11058a627468fDECC6D7E45CC75997c5"
            />
          )}
          {selectedMethod.slug === 'bitcoin' && (
            <PaymentMethodViewer
              alert={{
                title: 'Bu adrese yalnızca BTC gönderebilirsiniz.',
                desc:
                  'Bu kontrata göndereceğiniz diğer tokenları geri döndürülemez biçimde kaybedersiniz.',
              }}
              value="bitcoin:191pEwgp2gNsWKhQKQAVnoZqHhyxxmvA4W"
            />
          )}
          {selectedMethod.slug === 'para-transferi' && <LandingBiLiraFlow />}
        </Box>
      )}
    </>
  );
}

export default LandingPayment;
