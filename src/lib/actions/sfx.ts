const clickSound = new Audio('/sounds/click.wav')

export function sfx(node: HTMLElement) {
    const playSound = () => {
        clickSound.currentTime = 0.2
        clickSound.play()
    };

    node.addEventListener('click', playSound)

    return {
        destroy() {
            node.removeEventListener('click', playSound)
        }
    }
}
