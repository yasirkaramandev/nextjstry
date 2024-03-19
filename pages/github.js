import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GitHubPage = () => {
  const router = useRouter();

  useEffect(() => {
    // LinkedIn profil URL'sini buraya ekleyin
    const linkedInProfileURL = 'https://github.com/yasirkaramandev/';

    // Sayfa yüklendiğinde belirtilen LinkedIn profiline yönlendirme
    window.location.href = linkedInProfileURL;
  }, []);

  return <div>GitHub'a Yönlendiriliyorsunuz...</div>; // Opsiyonel: Yönlendirme sırasında görüntülenecek bir içerik
};

export default GitHubPage;
