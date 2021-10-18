import { Button } from '@chakra-ui/button';
import { Link as ChakraLink, Text, Flex, VStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Footer from '../ui/footer';

function Thanks() {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      direction="column"
      maxW="600px"
      margin="0 auto"
    >
      <VStack spacing="6" align="flex-start">
        <Text fontWeight="600">Merhaba,</Text>
        <Text>
          Uçurtma Projesi, ilk dönemini başarıyla tamamladı! Yola çıktığı
          zamandan bu yana; hayallerine, hedeflerine ulaşmak isteyenler ve bu
          kişilere destek sağlamak isteyenler arasında köprü oldu.
        </Text>
        <Text>
          Blok zincirini daha kullanılır bir hale getirmek için burada olmaya
          devam edeceğiz. Bu küçük hediyeyi senin için hazırladık. Umarız
          beğenirsin. 🙂
        </Text>
        <Text>
          En kısa zamanda yeni kampanya ve projelerimizde{' '}
          <ChakraLink as={Link} color="blue.500" to="/">
            ucurtmaprojesi.com
          </ChakraLink>
          &apos;da olacağız.
        </Text>
        <Button
          size="lg"
          boxShadow="modernOrange"
          bg="orange.500"
          color="white"
          _hover={{ bg: 'orange.400', textDecor: 'none' }}
          _active={{ bg: 'orange.400' }}
          onClick={() => {
            navigate('/#donate-all');
          }}
        >
          Tüm Öğrencilere Destek Ol
        </Button>
        <Text ml="auto" fontWeight="600">
          Uçurtma Projesi
        </Text>
      </VStack>
      <Footer hideLegals smallIcons />
    </Flex>
  );
}

export default Thanks;
