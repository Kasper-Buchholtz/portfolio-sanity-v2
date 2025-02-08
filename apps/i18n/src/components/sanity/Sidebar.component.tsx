import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/sanity.client';
import { Card, Stack, Text, Flex, Button } from '@sanity/ui';
import { ChevronDownIcon, ChevronUpIcon } from '@sanity/icons';
import Link from 'next/link';
import { resolveHref } from '@/sanity/lib/sanity.links';

export const typeToTitle = {
  page: "Sider",
  event: "Begivenheder",
  article: "Artikeler",
};

const Sidebar = () => {
  const [pages, setPages] = useState([]);
  const [openFolders, setOpenFolders] = useState({}); // State to manage open/close status of folders
  const [isClient, setIsClient] = useState(false); // State to track if rendering on the client

  useEffect(() => {
    // Set to true when the component is mounted (client-side)
    setIsClient(true);

    const fetchPages = async () => {
      try {
        const data = await client.fetch(
          `*[_type in ['page', 'event', 'article'] && defined(title)] {_id, title, slug, _type}`
        );
        setPages(data);
        console.log('Fetched pages:', data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
    fetchPages();
  }, []);

  // Group the pages by document type
  const groupedPages = pages.reduce((acc, page) => {
    if (!acc[page._type]) {
      acc[page._type] = [];
    }
    acc[page._type].push(page);
    return acc;
  }, {});

  // Toggle folder open/close status
  const handleToggle = (type) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [type]: !prevState[type], // Toggle the state of the clicked folder
    }));
  };

  if (!isClient) {
    // Don't render anything during SSR
    return null;
  }

  return (
    <div className="h-full sidebar">
      <Card tone="default">
        <Stack padding={4} space={3} className="h-full overflow-auto">
          <Text size={2} weight="semibold">Indhold</Text>
          {Object.keys(typeToTitle).map((type) => (
            groupedPages[type] && (
              <React.Fragment key={type}>
                <Sidebar.Item
                  key={type}
                  handleToggle={handleToggle}
                  openFolders={openFolders}
                  type={type}
                  pages={groupedPages[type]}
                />
              </React.Fragment>
            )
          ))}
        </Stack>
      </Card>
    </div>
  );
};

export default Sidebar;

Sidebar.Item = sideBarItem;

function sideBarItem({ handleToggle, openFolders, type, pages }) {
  const baseUrl = 'http://localhost:3333/super-login/presentation/'; // Replace with your actual Studio URL

  return (
    <div>
      <Card padding={2} className="hover:bg-gray-100" onClick={() => handleToggle(type)}>
        <Flex align="center" justify="space-between">
          <Text size={1}>
            {typeToTitle[type] || type} {/* Use the Danish title from the mapping */}
          </Text>
          <Button
            className="cursor-pointer"
            mode="bleed"
            icon={openFolders[type] ? ChevronUpIcon : ChevronDownIcon}
            padding={2}
          />
        </Flex>
      </Card>

      {openFolders[type] && (
        <Stack paddingLeft={4}>
          {pages.map((page) => (
            <Card marginTop={2} key={page._id} padding={2} className="hover:bg-gray-100">
              <Link
                href={`${baseUrl}${page._type}/${page._id}?preview=${resolveHref(page._type, page.slug.current)}`}
                className="items-start justify-start w-full py-4"
                rel="noopener noreferrer"
              >
                <Text cellPadding={2} size={2}>{page.title}</Text>
              </Link>
            </Card>
          ))}
        </Stack>
      )}
    </div>
  );
}
