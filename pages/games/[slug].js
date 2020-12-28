import React, { useEffect } from 'react'
import Image from 'next/image'
import { getAllGameSlugs } from '../../helpers/games'
import { parseMdFile } from '../../helpers/markdown'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineText, InlineImage, InlineBlocks } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import { toMarkdownString } from 'next-tinacms-markdown'

const Game = ({ markdownFile }) => {
  const cms = useCMS()

  const [game, form] = useForm(
    {
      initialValues: markdownFile,
      id: markdownFile.fileName,
      label: markdownFile.fileName,
      fields: [{
        name: 'frontmatter.excerpt',
        label: 'Excerpt',
        component: 'text',
      }],
      onSubmit: (formState) => {
        return cms.api.git.writeToDisk({
          fileRelativePath: markdownFile.fileRelativePath,
          content: toMarkdownString(formState),
        }).then(() => {
          cms.alerts.success('game saved!')
        })
      },
      reset() {
      },
    }
  )
  usePlugin(form)
  return (
    <>
      <main className="container">
        <InlineForm form={form}>
          <Head>
            <title>Games | {game.frontmatter.title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <InlineImage
            name="frontmatter.image"
            parse={(filename) => `/${filename}`}
            uploadDir={() => '/public'}
            previewSrc={(src, fieldPath, formValues) => formValues.frontmatter.image}
          >
            {({ src }) => <Image src={src} width={320} height={200} />}
          </InlineImage>
          <h1><InlineText name="frontmatter.title" /></h1>
          <InlineWysiwyg name="markdownBody" format="markdown">
            <ReactMarkdown source={markdownFile.markdownBody} />
          </InlineWysiwyg>
        </InlineForm>
      </main>
      <style jsx>{`
          .container {
            max-width: 600px;
            margin: 0 auto;
          }
        `}</style>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      markdownFile: parseMdFile(`games/${params.slug}.md`),
    }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: getAllGameSlugs().map((slug) => ({
      params: {
        slug: slug.replace('.md', ''),
      },
    })),
    fallback: false,
  }
}

export default Game
