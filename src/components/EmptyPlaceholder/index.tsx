const EmptyPlaceholder = ({name, url, width, height, content}: {name: string, url: string, content?: string, width?: number, height?: number}) => {
    return (
        <div className='text-center flex flex-col items-center justify-center'>
            <img src={url} alt={name} width={width} height={height} />
            <div className=" mt-5 text-center">
                <h3 className='font-semibold text-2xl'>{content || 'No Beer Found!'}</h3>
            </div>
        </div>
    )
}
export default EmptyPlaceholder;