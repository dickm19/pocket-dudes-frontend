import React from 'react'
import { setCurrentPet } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

class PetCard extends React.Component{

    state = {
        hunger: this.props.pet.hunger,
        happiness: this.props.pet.happiness,
        clicked: false
    }


    componentDidMount(){
        setInterval(() => {
            this.decrementPet()
        }, 10000);
    }

    feedPet(){
        if (this.props.pet.hunger < 10){

            this.setState({hunger: this.state.hunger + 1})
            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    hunger: this.props.pet.hunger + 1
                })
            })
            .then(resp => resp.json())
        }else{
            console.log('full')
        }
    }

    playWithPet(){
        if (this.props.pet.happiness < 10){
            this.setState({happiness: this.state.happiness + 1})
            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    happiness: this.props.pet.happiness + 1
                })
            })
            .then(resp => resp.json())
        }else{
            console.log('happy')
        }
    }

    localSetCurrentPet = () => {
        this.setState({clicked: true})
        return setCurrentPet(this.props.pet)
    }

    decrementPet = () => {
        if (this.props.pet.happiness > 0){

            const decrementedHappiness = this.state.happiness - 1
            const decrementedHunger = this.state.hunger - 1

            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/record',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    happiness: decrementedHappiness,
                    hunger: decrementedHunger
                })
            })
            .then( resp => resp.json())
            .then(() => this.setState({
                happiness: decrementedHappiness,
                hunger: decrementedHunger
            }))
        }else{
            console.log('FEED ME')
        }
        
    }

    render(){
        
        return(
            <div  className='pet-card'>
                <p>{this.props.pet.name}</p>
                <img className='pet-image' src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhMTEhMSFRUXEhgVFRUXFxcXEBUSFxUXFxUVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzUmICUtLS0vMi0rNS0vLi0tLS0tKy0vLS0uLS0tLy0uLSs1MistLS01LS0tLS0tLS0tLS0tL//AABEIAMEBBgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBAUGB//EADsQAAEDAgQEBQEHAwQBBQAAAAEAAhEDMQQSIUEiUWGBBRMycaEGFEJSkcHw8WKx4SNygtEHFSRDorL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QAMBEAAgIBAgMFBwQDAAAAAAAAAAECAxEEIRIxQQVRcaHRExQiMoGRsRVSYfAzQsH/2gAMAwEAAhEDEQA/APtVR4cIF0KXDObSf3sp5eXWZj+EPX0jvf8AhAB7CTIsnqPDhAul8zLwxMI+Xl1ugJS4fVpP72SuYSZFkYz9I7qeZHDHdANUeHCBdCkcvq0U8vLrdSM/SO6AVzCTItM9k9RwcIGpS+ZHDHSUcmTW+yAlI5fVolLDM7TPZNGfW0ac0PMjhjpKAao4OEDUoUjlEHRDJk1vspGfW23NADIZzbTPZNVdmEDXdDzfux0n4Uy5Nb7fv8kAaTsog6bpchnNtM9ro5c+ttv3+anm/d/4z8SgDVOYQNUabg0QdChlya32UyZ9bbIBQwzO0z2TVTm0bqh5k8MdJUjJredOSAam4NEHQpGsIM7TPZNkz622Q8yeGOkoA1Tm9OqNN4aIOhQjJreeynl5tbIBWsIMmyaqc3p1Q8yeGOkqRk6z2QDU3hog3SMYQZNk3l5tbIeZm4YhAGrxenWP3ujTeGiDdL6Os9rI+Xm1mJ/hAV+S7l/ZBWfaenyogBTeSYNkavDGXRM94cIF0KXDfdAFjARJukpuJMGyj2EmRZPUeHCBdALV4fTomawESboUuG+6V1MkyLICU3EmDZGrw+nRNUeHCBdCmct90AWsBEm8T3SU3EmDZRzCTm2umqPDhAQAqnL6dEQ0RO8T3S03ZdCq3NJM7TPZANTeSYdZSq/Lo3RcDxz6zwNGWPrtLwdWMBe8HkQ0HL3hcRn/AJNww0bRxLtbxTA+XyuuF9x0oSfI95Aid4nukpPzGHWXhqf/AJDoF0mhiBrNqZ3/AN66B+u8I4amqzX71Mn/APMrl7HfsLHyR6qq/KYboI+U8CJ3ie64nh/1JhHaNr05NgTld+ToK6Lb5tpmel0OJQlH5lg0UnZtHao1HFphtlW+pmED3TUqgaIPuhyWloid4nulpHN6tVW1pnNtM9lZUdm0CAFRxaYFk7mACReJ7oU3hog3ShhBzbTPZAGkc3q1QqOIMCyaoc1kabw0QboCOYAJF0tLi9WqDaZBk2TVOK2yAWo4gwLJ3sAEi6lN4aIN0jGEGTZAGlxTm1QqOIMCyarxW2RY8NEG6Abym8lFR5DuSiAsNPLreP4UHH0j9f4S03EmDZGrpGXvCAnmZeHkiaeXW6LGgiTdJTcSYNkAwGfpCHmRwqVdPT8J2tBEm6AU08ut1AM/SEtNxJh1kaxj0/CAhqxw9krm5Nb7JgBEm8fKoa8k8VkAK1VuUveQ1rQSSTwhoEkkmwXxr6z+v6uKcaOFc6nhxoXiW1aw5k3az+m53vA3/wDlX6n8x5wNB3A0/wDuHCznjUUp5DQnrA2K8PhcMrtFG3EyKy3gGwmGHJd3AeHOdZqt8I8OmCV7Xw3CgAaL25pbIQnJrLOHh/p6qRYfmrj4M8ephH9l7HDsWxjFn2bk8bZI+f1PBgRZZ6eGr0NaNWpT6NJyd2HhP5L6Q/BtNwFixHhQ2VKTlF/CzSo1zW0t0ea8N+s61IxiKYqC2dnC/wBy06HtC9h4X4rRxIzUngxoW/fb/uadQvN4zwYHZcPEeFPpuD6Zcx4s5phw78ui6hq98SLUtNptQsw+F+X29D6g2vPD2lWA5Nb7Lw3g31bH+niwGu2rDRhP9Y+6etvZevw9bNcyIkclcTTWUZGo01lEsTX16M2BufW2yIqzw9lQ6oQeGyv0iRePlekAxGTW8qBmbWyWiZ9XypUcQYbZAHzJ4eyJGTrKZzQBIukpa+r5QBFPNrZDzM3ChUcQYFk72gCRdAA8HWf0UFPNraf4Qpazm7ShUcQYFkAftPRRWeW3kFEAr6gcIF0KfDfdQ08uvL+FBx30j9f4QCupkmRZO94cIF0pqZeHkiaeXW6AlPhvuldTJMiyYDPfSEpqxwoBqjw4QLpWOy33UczLrdVk576QgFqNJOba68v9e/U4w9HJSP8Ar1NGf0Nsah9tuZ9iun47423DsOmZ0Qxu5PM8h1Xy7GtfUe6pUOZ7jqdugA2A5KWqHFISkoR4meepYTnJNyTqSTck7lb8Lh9QtTcPJA5mFwj4njXPP2fBPLAYDqjXNzDmJgD5Wo5RrW5kSlO6Ta6HvvDmAALsUMSAvB+H+OVGuYzEYerRzODQ4td5eZxgDNEX5FespNVWUYzy0yWV04YTR36GNC30cWF56it+GKzb5KJYqnKR3mVgrJlYKJWtjlmTuRdimB9EFYsRggdly/GfGMcKrqWGwpcGx/qO9DpE8JJA0tdcbF/UnilDirYLMzfI0uMe7HOjuFDOqU901nxJoWOBu8U8GBB0XL8P8TrYQhhl9GfR95nVhO39NvZezwNcV6NOqGuaHsDsrhD2yJgjYrl+JeHB06LjT6x1y4JGvTqI2R9naso7vhXilOpTD2ODmncbdCNj0K205BzbXXzAU6uGf5lEx+Jp9DxyI/W4XsvAvqJmIGUcLwOJh9Q6j8Q6/wBluwkprKKGr7PlV8cN4+a8fU9G9+aysp1A0QVka/LbWVcwZtbLozh2sIMmyeoc1tlW2rPD2TngtrKAZjw0QbpG0yDJsmFPNrZAVM3CgDU4rbIsqBog3QPBbWVBTza8/wCEAnkHogn+0nkEEBKZJOsx1sjV0jL3hM+oHCBdLT4L78kAzAI1iet0lMknimOtlHUy4yLJn1A4QLoBaxj094RERJiflI12S+/JZ8Q77xIA+V5KSisvkCxryTxW62XO8U8RDNKcE/8A1HvzVWP8SnQaD5XFr1VXhc7XiC27zmdkYczmY4Fzi5xLnG5P7suXXprrVyudWW3pacGPqtU5GHy1Y1xVgCZrQtFx2M6u2OXxI04V5FiR7GFpprMxX03KncW6Vlm6kVsolc6m9cP6h+n61WqzE4PEeRiGtyHNJo1GAkgOABtmN2n4Xz+rXFs3g2tPE93SqrQ3ELyn0n4O/DMeatZ1etVfnq1DMTEBrAbNA/Y0A9AHr5DW2zhNqMjXrryt0bvtB6LG/FPnUkIh6cPWb71d1ZNGCXQtZUJAzXS1AhnSuepNO25ZZ6o7nOxmFBXn8d4aQQ9hLXNMtc0w4HoV6iq5YK6+q0d8kXabJRB4F9Uaili4DrNqWpuP9X4T8e1l6zzSDw26WXznH0AZ0T+A/Uj8KRTqy+jOhu+n7fib0225Lcg1NbEGq7MVi9pQt+709Pt3H02RGkT8pqJn1dpXOwdYODajXBzSJBBkEHcLYX57bIYTWNmXPcQeGY6WVjwI0iel1XTqBogqMYQZNkPBqWs5u0oVCQeGY6WRfx225pmVA0QbhANkb0UVP2c9FEA5p5dRt/CjeO+kcuqWmTPFMdbI1dsveP8ACADquXhGyD2ZdQnbEaxPW6zhxnimOtkBVisQA0udpFo3J2XnMZ4iTc+3RWfUeL/1AwWAnTmf8QvP1qpNlnWRlqLGv9V+SvdeobI1VMWqX1lzqwfyWYYog6rY0tK6GZbqH1OjVesdQqeeCq3PWzVHBnXSyFM0qgvQ81SyOK47mxr1Y2ouf5yIrqjcsmtp4HWZVWinWXGbXV1OusTVV5RuaeJ3qVZXCsuLSxC0faF8lrdO8m3TDKOn56IxS5DsQqH4lZnsC3GjJ3jiwldjAvOPxhVD8cVaqowSLS5PRvxYWepiF592PKQ45a1CcSVaRnVxFRcrEsnZWNeSi4rXpswTQjwFv0v447DVPKqH/Re6DP8A8bj94cgd/wA/f6ax+W2sr5BjWAtM8l9C+kMYamGpOeZOXLJ3LSWz8K/xcSyY/bWmjhXx2beH/wAZ6am3NqVYyrm4VjDzPDMdLLZpGkT0uuT58c8FtZ5oinm1O6Wj/V2n/KlQmeGY6WQE+0HkFFbDf6fhRAK6oHaC5St4L78uiLqYbqNkG8d9uXX+EAj6ZdqLKutUDhAVj6hbwj/KprU8okfKA8b9VUiyoHGzh8i4/KFy8JVBK9l4hhW12Fr7bRcHmOq8HjsFUoPh2onRwsf+j0VX/DNt/K/JmXrK5xlxrdHdbSBWXF+GNdss+C8Q2K69GuCrcJ8LyhVOuxYZ5TFeHPZq38lhfiCPUCF780muXPxfg7TYLWp1e25xZoIS+XY8U7GBV/al3Mb9O8guPiPCajdpVpXQl1IFpJwfeIK6ZtZZzTIuCma0qKeGXacI1sqq9lVYWgq5krOugma1EkdCnWWhtdcxpV7HLD1enTNrTzRrdVVD6iUuSFYsqcM168Cvcqirsiuo4Jztl1CDfJE3Eo8zDkJW3DYHcrqYfw4N91c6krUIcPMhnqc7ROa6nCz1SujVplYa9LmrVeWxCWTmYupoQvoX07hizD0qdi1su/3OOY/JK8p4J4f5lQPcOBp0/qcP0H917ajw235rUisRwY/bOqjLFEem78e462Hq5dCtNJhHEbLHhmZtStdKoXcJt8r0wTQ7jttzTNqBog7JDwW35p20w7U78kAn2c9FEftB6KICU5nimOtvlGttl7x/hF1QO0G6DeC+/LogIIjWJ63WWDPFMdbfK0Opl2o3/NJUeHaBAYMW38PeP8LnYik0thwB01Buuu9uW+/JYq+HnVAeTxPhMGW6dDZZW03tPL+y9TXZm0Cw1KGXQiVWlQ471PH8c19un0IJ6aqe7WH3ow0Ma4XH5Lo0MY03WJ2G3FvlKw9FBLU31fPW/GO/lz8hHSzXyyT8djtNY1yD/D2nZc+lWaOYW6jihs781Gu1K5PCnv8Azt+Sb3e1c4met4BTdssFX6UbtovRMxHsrm1einWsl0Z57PvR49/0s4WIVZ+nHjYL24IR8tHqpPmdxikeF/8AQan4VP8A0N/L+y9ycOh9kUUrk+Zaha0eIHgb+iup+BcyvZDBBOMK0KvKcO4uR1k11PL0fB2jafda24Hou8aYVVQgKGVyR17zKRxzg1TUw4W7E4tguQuTicaT6B3Nl5W5WPEUTKTSzJ4RnxeVo1XOZhXVTJBDPl3tyHVbmYbOZJk9bdguhQZl0K2aKeBble7tLhXDV9/T1Hw9JoADQBAgAbey6WDb+LtP+Vnw+HjVdGkzNbbmrBkN5L2NM8Mx0t8LeAI0iel1RQOXQ/Cvp0i3iP8AlAPR/q7T/lGpM8Mx0t8KHjttzTNqBuh2QD8H9Pwoqvs55hRAO6mG6i4QZx325dUtMGeKY62Rq7Ze8f4QAfULTAspUphokJ2ERrE9bqtgM8Ux1sgKsme+3JZqsgwLfK21hPp7wgGiNYnrdAcuvhg3ULI6hmv8LrCkZ4pjrZVV6U+n4QHEq04MdlRVwuXULuGiI1ifmVmGHM8VutkBxfs+a6pdTgx17rtV8P8Ah+FWaAjaY7yo7Kq7FicU/FZOozlH5Xg5bw5tiU9LFVOa1Nw53t1SVcP+H4VR9maZ8o48G1+GTLVWdXnxQjfFXgwQtA8ZIu1UmgI2mO8qpmHO/wAqP9Mh0nL7p/lHvvPfFf36nQp+OD8JTjx5vIrl1KHL4R8gRtMd5T9NX735eg9vH9q8zqP8fA+6VUfHibNXOZQ5/KL6B2t0T9Lh1k/L0HvHdFefqXVPGahMAALNiK9Q3cVoFARtPzKNLD/i+VLDs7Tx6Z8X/UePVWdNvBGKnh82pVtOnJjstpw5nS3Sy0toCNIn5lXIxUVhLBDKTk8t5MbaGWy10MNm1Kvw9D8XytPkmeGY6WXRyV0GkmNltbTyW35pxTEaRPyraDI9XaUA1KkHCSnY8kwbJXNM8Mx0srnRGkT0ugA4ZLb80zaYdqblLS3zdp/yhUBnhmOlkAPtB6KK6W/0/CiAQ1M2g3/lRvBfWeXRF9MNEi4Qp8d9kADTzcSJqZtAldULTAsnewNEi6AUcF9Z5JXUp4k7OK+yVzyDAsgFc7NoFXly31laH0w0SErG577ckBldh54u6R7c2gWpziDl2spUpBokIDAaWXQqp2Fni7rosp5tSkdfLtbsgOa+lm0CTycuh911KlAN1HslbQzan2QHJOE+93/VK6jm0HuuoW65dpjtZSph8uo9kByhRy6H3S/ZPvd/1XWZh82p9kmTXLtMdrIDmmjm0Hui2jl0Puum/D5dR7I08OHan2QHNGE+93Vgo5tAtwbrl2mOysdRy6hAYWU8uhVrMLHF3WynQDtSi3U5drICgU81tIV9MZdCrXMy2T06QcJKArbRji7pyM9tIUa8k5Tayd4yW35oCNfl0Kgp5eJMxgcJKRtQkwbIBncdtI5qCpl0OylTgtuiymHCTcoBPs55hRD7QeiiANMEHWY62Rq6xl7wiambTn/Kg4L6z+n8oAsIA1iet0lMEHimOtkTTzcXNE1M2lkAKuvp7wnaREGJ+UoOS+soeXPEgBTBB4rdbI1RPp+ES/NpZQHJfWUAWkRBiY7yq6bSDxW62TeXPF3RL82lt0AlVs+n4TCIjSY7yiDk0OqHlTxd0BXTYQeK3VCqyfTbpzVpdn0tuoDk0Ou6ASBEaTHeVXTZB4rdeau8r73ePlQnPoNN/wB/mgKatOTw26c02URGkx3lWA5NDrv+/wAkPK+93j5QFVKnB4rdealSmSeG3RXE59BpuoHZNL7oBIERpMd5QpMj1fKs8qOLuiTn0Gm6AqqMJPDbpZWmIgRMd5UDsul91BSji7oBaQj1fKlRpJ4bdE5OfQaQoH5dLoAuIiBE/KWlp6vlQU44u6JOe2kIBagJPDMdLJ3kEaRPygKmXS6Ap5eJASlpObtKFQEnhmOlkx47aQoKmXS8fygHzt6KKv7MeaiAZ9MNEi6FPivslptIMmyNXWMvdAB1QgwLJ3sDRIuoxwAg3SU2kGTZANT4r7JXVCDAsjV19KZrgBBugI9gaJF0KYzX2S02kGTZGqJ9KABqEHLtZPUYGiQo1wiDePlJTaQZdZANTGbUpTUIOXaY7I1RPpTBwiN4jugBUblEhSmM2p9ktIEGXWRqifSgB5hnLtMdrJqjcuo9kcwiN4jukpCDxW/VANTbm1Psl8wzl2mO1lKok8Nv1T5hEbxHdACo3LqPZSm3MJPshSEepCqCTLbICCoZy7THZNUGXUIlwiN4julpCPUgGYwOElIKhJy7WUqgky2ydzhEC8fKAFQZbbosYHCTdLSEepCo0ky2yAjahJg2TVBltui5wIgXS0tPUgGYwOEm6RtQkwbKVGkmRZO9wIgXQAqcNt0WUw4SbpaWk5uyFRpJkWQC+eeiiv8AMbzCiAmI9J/e6TC79v1UUQFdb1H97K/EekqKIBMLuq6vqPuoogL8R6UmFsUVEBVU9XdXYm3dFRALhbH3VTvV3UUQF2Jt3Qwtj7qKICo+v/l+qtxNu/8A2iogBhbd/wDpVff/AOX6qKIC3FWHujhrd1FEBS31f8v1VuKsPdRRAHDW7qlnq7qKIC3FWHumw/pUUQFFL1D3VmK2UUQD4f0hUUfUFFEBZitu6fD+kfvdRRAZAooogP/Z"} onClick={ this.localSetCurrentPet} alt={this.props.pet.name}/>
                <p className='happiness'>Happiness: {this.state.happiness}/10</p>
                <p className='hunger'>Hunger: {this.state.hunger}/10</p>
               
                    {this.state.clicked ? 
                        <div className='care-buttons'>
                            <button className="feed" onClick={() => this.feedPet}>Feed</button>
                            <button className="play" onClick={() => this.playWithPet}>Play</button>
                        </div>
                    :
                        null
                    }
                
            </div>
        )
    }
}

function mdp(dispatch) {
    return { 
        setCurrentPet: (pet) => dispatch(setCurrentPet(pet))
       
     }
}
export default connect(null, mdp)(PetCard);
  