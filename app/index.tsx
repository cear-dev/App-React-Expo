import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PaperProvider, Card, Text, ActivityIndicator } from 'react-native-paper';

export default function Index() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  interface Noticia {
    title: string;
    description: string;
    urlToImage: string;
  }

  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=mexico&sortBy=publishedAt&apiKey=b05ad6d7970943fe98213255f83763ae')
      .then(response => response.json())
      .then(data => {
        setNoticias(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PaperProvider>
        <ActivityIndicator animating={true} size="large" />
      </PaperProvider>
    );
  }

  

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        {noticias.map((noticia: Noticia, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title title={noticia.title} subtitle="" />
            <Card.Content>
              <Text variant="titleLarge">{noticia.title}</Text>
              <Text variant="bodyMedium">{noticia.description}</Text>
            </Card.Content>
            {noticia.urlToImage && <Card.Cover source={{ uri: noticia.urlToImage }} />}
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});
