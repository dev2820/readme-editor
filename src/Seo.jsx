import { Heading } from './components/ui/Heading';
import { Text } from './components/ui/Text';

export function Seo() {
  return (
    <>
      <Heading as="h1" align="center" className="mb-8">
        Readme Editor
      </Heading>
      <Text as="p" className="max-w-689px text-wrap mb-8" align="center">
        <Text as="span" className="text-primary" weight="medium">
          Readme Editor
        </Text>{' '}
        is a free online Markdown editor that offers a{' '}
        <Text as="span" className="text-primary" weight="medium">
          GitHub user-friendly
        </Text>{' '}
        interface and a variety of features.
      </Text>
    </>
  );
}
