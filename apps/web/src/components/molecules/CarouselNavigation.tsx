import { AdvancedButton } from "../atoms/AdvancedButton"
import Icon from "../atoms/Icons"

/**
 *
 * @returns: Navigation til Gallery.
 * @example: <CarouselNavigation swiperRef={swiperRef} />
 * @alias: CarouselNavigation
 * @summary: Denne komponent bruges til at oprette navigation til galleri.
 * @version: 1.0.0
 * @property: [swiperRef]
 * @author: Kasper Buchholtz
 *
 **/

const CarouselNavigation = ({ swiperRef }) => {
  return (
    <div className="absolute inset-0 z-10 justify-between hidden h-full pr-4 pointer-events-none md:flex xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52">
      <span className="my-auto pointer-events-auto">
        <AdvancedButton
        className="size-10"
        variant="secondary"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <Icon
            className="my-auto -rotate-90 fill-superego-light-light size-4 "
            type="chevronUp"
          />
        </AdvancedButton>
      </span>

      <span className="my-auto pointer-events-auto">
        <AdvancedButton
          variant="secondary"
          className="size-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <Icon
            className="my-auto rotate-90 fill-superego-light-light size-4 "
            type="chevronUp"
          />
        </AdvancedButton>
      </span>
    </div>
  )
}

export default CarouselNavigation