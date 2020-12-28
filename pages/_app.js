import React, { useMemo } from 'react'
import { TinaProvider, TinaCMS } from 'tinacms'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import { GitClient, GitMediaStore } from '@tinacms/git-client'
import { toMarkdownString } from 'next-tinacms-markdown'
import slugify from 'slugify'
import Nav from '../components/nav'

const GameCreatorPlugin = {
  __type: 'content-creator',
  name: 'Game',
  fields: [
    {
      name: 'frontmatter.title',
      label: 'Title',
      component: 'text',
      validate(title) {
        if (!title) return "Required"
      }
    },
    {
      name: 'frontmatter.image',
      label: 'Image',
      component: 'image',
      parse: (filename) => `/${filename}`,
      uploadDir: () => '/public',
      previewSrc: (src, fieldPath, formValues) => formValues.frontmatter.image
    },
    {
      name: 'frontmatter.excerpt',
      label: 'Excerpt',
      component: 'text',
    },
    {
      name: 'markdownBody',
      label: 'Description',
      component: 'markdown'
    }
  ],
  onSubmit(formValues, cms) {
    const fileRelativePath = `games/${slugify(formValues.frontmatter.title, '_')}.md`
    return cms.api.git.writeToDisk({
      fileRelativePath: fileRelativePath,
      content: toMarkdownString(formValues),
    }).then(() => {
      cms.alerts.success('game created! Reload page to see new game')
    })
  },
}


const App = ({ Component, pageProps }) => {

  const gitClient = useMemo(() => {
    return new GitClient(`/___tina`)
  }, [])
  const cms = useMemo(() => {
    return new TinaCMS({
      enabled: process.env.NODE_ENV !== "production",
      toolbar: { hidden: false },
      plugins: [MarkdownFieldPlugin, GameCreatorPlugin],
      apis: {
        git: gitClient,
      },
      media: new GitMediaStore(gitClient),
    })
  }, [])

  return (
    <TinaProvider cms={cms}>
      <div className="container">
          <Nav />
        <Component {...pageProps} />
        <footer>
          ~!
        </footer>
      </div>
    </TinaProvider>
  )
}

export default App