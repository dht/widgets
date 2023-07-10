import { useCustomEvent } from 'igrid';
import { useState } from 'react';
import { A, Github, Image, Version, Wrapper } from './Logo.style';

export type LogoProps = {
  callbacks: {
    onDoubleClick: () => void;
    onLogoClick: () => void;
    onGithubClick: () => void;
  };
};

export function Logo(props: LogoProps) {
  const { callbacks } = props;
  const [version, setVersion] = useState<string>('');
  const [dependencies, setDependencies] = useState<Json>({});

  useCustomEvent('global/version', (data: Json) => {
    setVersion(data.version);
    setDependencies(data.dependencies);
  });

  return (
    <Wrapper className='Logo-wrapper' data-testid='Logo-wrapper'>
      <Image
        src='/logo-light-mode.svg'
        alt='logo'
        draggable={false}
        onDoubleClick={callbacks.onDoubleClick}
        onClick={callbacks.onLogoClick}
      />
      <A onClick={callbacks.onGithubClick}>
        <Github src='/github-mark.svg' alt='github' draggable={false} />
      </A>

      <Version onClick={() => console.log(dependencies)}>{version}</Version>
    </Wrapper>
  );
}

export default Logo;
