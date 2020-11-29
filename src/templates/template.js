import React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import Sidebar from "../components/sidebar"

export default function Template(props) {
  const data = props.data
  const pageContext = props.pageContext
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const index = pageContext.nodes.findIndex(
    row => row.node.frontmatter.slug === pageContext.slug
  )
  const prev = pageContext.nodes[index - 1]
    ? pageContext.nodes[index - 1].node
    : null
  const next = pageContext.nodes[index + 1]
    ? pageContext.nodes[index + 1].node
    : null

  return (
    <>
      <Header siteTitle="Makefile" />
      <main className="w-full mx-auto grid grid-cols-12 grid-flow-col gap-4">
        <section className="col-span-2 lg:block hidden">
          <Sidebar nodes={ pageContext.nodes } />
        </section>
        <section className="col-span-10 lg:max-w-4xl">
          <article>
            <div className="px-6 py-4 lg:py-8">
              <p className="mt-1 text-sm text-gray-500">{frontmatter.date}</p>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </article>
          {(prev || next) && (
            <section className="min-w-0 w-full col-span-2 lg:static lg:max-h-full lg:overflow-visible">
              <nav>
                <ul className="flex flex-wrap justify-between mb-8">
                  <li>
                    {prev && (
                      <Link
                        className="text-blue-600"
                        to={prev.frontmatter.slug}
                        rel="prev"
                      >
                        ← {prev.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link
                        className="text-blue-600"
                        to={next.frontmatter.slug}
                        rel="next"
                      >
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </section>
          )}
        </section>
      </main>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
