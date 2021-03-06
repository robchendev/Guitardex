import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { DexMetaContainer, MetaInfo } from './styles'
import { Link } from 'gatsby'
import DiffContainer from '../DiffContainer/DiffContainer'
import GroupContainer from '../GroupContainer/GroupContainer'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import { DexResultContainer, DexResultBlock } from './styles'

const DexItem = ({ id }) => {
	return (
		<StaticQuery
			query={graphql`
				query {
					allMarkdownRemark {
						nodes {
							frontmatter {
								id
								g
								group
								title
								difficulty
								category
							}
						}
					}
				}`
			}
			render={data => {
				const selection = data.allMarkdownRemark.nodes.find(
					node => node.frontmatter.id === id
				)
				return (
					<Link to={
						selection && selection.frontmatter.g + '/' + selection.frontmatter.id
					}>
						<DexResultContainer>
							<DexResultBlock>
								<DexMetaContainer>
									<MetaInfo>
											<h4>
												{selection ? 
													selection.frontmatter.title 
													: 
													`Unknown (id: ${id})`
												}
											</h4>
											<p>
												{selection ? 
													<span>{selection.frontmatter.difficulty && <DiffContainer difficulty={selection.frontmatter.difficulty} />}{selection.frontmatter.group && <GroupContainer group={selection.frontmatter.group} />}{selection.frontmatter.category && <CategoryContainer category={selection.frontmatter.category} />}</span>
													: 
													`Unrecognized ID`
												}
											</p>
									</MetaInfo>
								</DexMetaContainer>
							</DexResultBlock>
						</DexResultContainer>
					</Link>
				)
			}}
		/>
	)
} 
 
export default DexItem