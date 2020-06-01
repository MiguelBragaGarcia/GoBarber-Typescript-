import React from 'react';

import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=400&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="Miguel Braga Garcia"
            />

            <div>
              <span>Bem-vindo</span>
              <strong>Miguel Braga Garcia</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
