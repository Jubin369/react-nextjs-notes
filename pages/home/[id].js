import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ notes,username }) => {
  console.log('check',username);
  return (
    <>
    <Layout pageProps={username}>
      <div className="notes-container">
        <h1>Notes</h1>
        <div className="grid wrapper">
          {notes.map(note => {
            return (
              <div key={note._id}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <Link href={`/${note._id}`}>
                        <a>{note.title}</a>
                      </Link>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/${note._id}`}>
                      <Button primary>View</Button>
                    </Link>
                    <Link href={`/${note._id}/edit`}>
                      <Button primary>Edit</Button>
                    </Link>
                  </Card.Content>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
    </>
  )
}

Index.getInitialProps = async ({ query: { id } }) => {
  console.log(id);
  const res = await fetch(`http://localhost:3000/api/notes?username=${encodeURIComponent(id)}`);
  const { data } = await res.json();

  return { notes: data,username:id }
}

export default Index;