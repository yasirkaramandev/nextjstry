import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GitHubPage = () => {
  const router = useRouter();

  useEffect(() => {
    // GitHub profil URL'sini buraya ekleyin
    const githubProfileURL = "https://github.com/yasirkaramandev";

    // Sayfa yüklendiğinde belirtilen GitHub profiline yönlendirme
    window.location.href = githubProfileURL;
  }, []);

  return <div>Yönlendiriliyorsunuz...</div>; // Opsiyonel: Yönlendirme sırasında görüntülenecek bir içerik
};

export default GitHubPage;
