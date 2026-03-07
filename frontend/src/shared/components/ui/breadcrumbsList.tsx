import React from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from './breadcrumb'

interface Props {
	items: { label?: string; href?: string }[]
}

export const BreadcrumbsList = ({ items }: Props) => {
	return (
		<Breadcrumb className='container'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Главная</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{items.map((item, index) => {
					if (!item.label) return null

					return (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink href={item.href}>
									{item.label}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index !== items.length - 1 && (
								<BreadcrumbSeparator />
							)}
						</React.Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
