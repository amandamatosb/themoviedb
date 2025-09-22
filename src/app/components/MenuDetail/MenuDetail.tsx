import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import styles from './MenuDetail.module.css'


export function MenuDetail ()
{
  return (
    <div className={styles.menu}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            
            <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Main</NavigationMenuLink>
              <NavigationMenuLink>Alternative Titles</NavigationMenuLink>
              <NavigationMenuLink>Cast & Crew</NavigationMenuLink>
              <NavigationMenuLink>Release Dates</NavigationMenuLink>
              <NavigationMenuLink>Translations</NavigationMenuLink>
              <NavigationMenuLink>Changes</NavigationMenuLink>
              <NavigationMenuLink>Report</NavigationMenuLink>
              <NavigationMenuLink>Exit</NavigationMenuLink>
            </NavigationMenuContent>

          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList> 
          <NavigationMenuItem>

            <NavigationMenuTrigger>Media</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Backdrops</NavigationMenuLink>
              <NavigationMenuLink>Logos</NavigationMenuLink>
              <NavigationMenuLink>Posters</NavigationMenuLink>
              <NavigationMenuLink>Videos</NavigationMenuLink>
            </NavigationMenuContent>

          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList> 
          <NavigationMenuItem>

            <NavigationMenuTrigger>Fandom</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Discussions</NavigationMenuLink>
              <NavigationMenuLink>Reviews</NavigationMenuLink>
            </NavigationMenuContent>

          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList> 
          <NavigationMenuItem>

            <NavigationMenuTrigger>Share</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Share Link</NavigationMenuLink>
              <NavigationMenuLink>Facebook</NavigationMenuLink>
              <NavigationMenuLink>Tweet</NavigationMenuLink>
            </NavigationMenuContent>

          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}


