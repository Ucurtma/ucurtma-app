import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import LandingBiLiraFlow from './landing-bilira-flow';
import PaymentMethodViewer from './payment-method-viewer';
import PaymentMethods from './payment-methods';

function LandingPayment() {
  const [selectedMethod, setSelectedMethod] = useState();

  return (
    <div>
      <Box mt={7}>
        <PaymentMethods
          activeMethod={selectedMethod}
          onSelect={method => setSelectedMethod(method)}
        />
      </Box>
      {selectedMethod && (
        <Box
          mt={6}
          px={5}
          py={6}
          boxShadow="0px 0px 13px rgba(196, 196, 196, 0.45)"
        >
          {selectedMethod.slug === 'bilira' && (
            <PaymentMethodViewer
              alert={{
                title: 'Bu cüzdan sadece BiLira tokenı kabul etmektedir.',
                desc:
                  'Bu kontrata göndereceğiniz diğer tokenları geri döndürülemez biçimde kaybedersiniz.',
              }}
              value="0x3365CfF5e0970fbB2cF744796901002d9987c0Dc"
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
    </div>
  );
}

export default LandingPayment;
