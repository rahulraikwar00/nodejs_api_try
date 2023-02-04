const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


// Getting all

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber);
})



// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    })

    try {
        const newSubs = await subscriber.save()
        res.status(201).json(newSubs)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Updating one 
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribeToChannel != null) {
        res.subscriber.subscribeToChannel = req.body.subscribeToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({
            message: 'Deleted subscriber Succcefully!'
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// middle ware 
async function getSubscriber(req, res, next) {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.subscriber = subscriber;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = router