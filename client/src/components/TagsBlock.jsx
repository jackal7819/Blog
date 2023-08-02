import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SideBlock } from './SideBlock';
import Skeleton from '@mui/material/Skeleton';
import TagIcon from '@mui/icons-material/Tag';

export const TagsBlock = ({ items, isLoading = true }) => {
    return (
        <SideBlock title='Tags'>
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, i) => (
                    <a
                        style={{ textDecoration: 'none', color: 'black' }}
                        key={Math.random()}
                        href={`/tags/${name}`}>
                        <ListItem key={i} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <ListItemText primary={name} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>
        </SideBlock>
    );
};
